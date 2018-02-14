const functions = require('firebase-functions');
const admin = require(`firebase-admin`);
admin.initializeApp(functions.config().firebase);
const ref = admin.database().ref();
const express = require('express');
const cors = require('cors');
const app = express();
const Promise = require('bluebird');
const bodyParser = require('body-parser');

function validateAuthorization(headers) {
    return new Promise((resolve, reject) => {
        console.log('checking if authorized');

        if (!headers.authorization || !headers.authorization.startsWith('Bearer ')) {
            console.error('Request is not authorized');
            throw new Error('Unautorized');
        }

        const idToken = headers.authorization.split('Bearer ')[1];
        return admin.auth().verifyIdToken(idToken)
            .then(user => {
                console.log(`Decoded the user: ${JSON.stringify(user)}`);
                return resolve(user);
            })
            .catch(reject);
    });
}

function random() {
    return Math.floor(Math.random() * 1000);
}

app.use(cors({origin: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    validateAuthorization(req.headers)
        .then(user => {
            req.user = user;
            return next();
        })
        .catch(err => {
            console.error('Error: ', err);
            return res.status(401).send(err.message);
        });    
});

app.get('/league/create', (req, res) => {
    console.log('creating new league');
    const newLeague = ref.child('/leagues/').push();
    let users = {};
    users[req.user.uid] = true;
    let objectToSet = {
        createdBy: req.user.uid,
        users: users,
        name: `League#${random()}`,
        state: 'new',
        id: newLeague.key
    };
    // console.log('objectToSet: ' + JSON.stringify(objectToSet));
    newLeague.set(objectToSet).then(() => res.send({leagueId: newLeague.key}))
    .catch(err => {
        console.error('Error:', err);
        res.status(503).send(err.message);
    });
});


exports.createUserAccount = functions.auth.user().onCreate(event => {
    console.log('event.data= ', event.data);
    const uid = event.data.uid;
    const name = event.data.displayName || `Guest#${random()}`;
    return ref.child(`/users/${uid}`).set({ name });
});

exports.api = functions.https.onRequest(app);