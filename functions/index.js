const functions = require('firebase-functions');
const admin = require(`firebase-admin`);
admin.initializeApp(functions.config().firebase);
const ref = admin.database().ref();
const express = require('express');
const cors = require('cors');
const app = express();
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const MAX_USERS_IN_LEAGUE = 4;

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
        res.status(500).send(err.message);
    });
});

app.get('/league/:id/join', (req, res) => {
    const leagueId = req.params.id;
    console.log(`joining league id ${leagueId}`);
    const leagueRef = ref.child(`/leagues/${leagueId}`);
    leagueRef.once('value')
        .then(snapshot => {
            if(!snapshot.exists()) {
                const err = new Error(`League ${leagueId} does not exists`);
                err.code = 404
                throw err;
            }

            const usersSnapShot = snapshot.child('users');
            if(usersSnapShot.numChildren() === MAX_USERS_IN_LEAGUE) {
                const err = new Error(`League ${leagueId} is full (${usersSnapShot.numChildren()})`);
                err.code = 400
                throw err
            }

            return ref.child(`/leagues/${leagueId}/users/${req.user.uid}`).set(true);
        })
        .then(() => res.send())
        .catch(err => {
            console.error('Error:', err);
            res.status(err.code ? err.code : 500).send(err.message);
        });
});

app.get('/league/:id/leave', (req, res) => {
    
    const leagueId = req.params.id;
    console.log(`leaving league id ${leagueId}`);
    const leagueRef = ref.child(`/leagues/${leagueId}`);
    leagueRef.once('value')
        .then(snapshot => {
            if(!snapshot.exists()) {
                return;
            }

            const leagueState = snapshot.child('state').val();
            if(leagueState !== 'new') {
                const err = new Error(`cannot leave league at state ${leagueState}`);
                err.code = 400
                throw err
            }

            return ref.child(`/leagues/${leagueId}/users/${req.user.uid}`).remove()
        })
        .then(() => res.send())
        .catch(err => {
            console.error('Error:', err);
            res.status(err.code ? err.code : 500).send(err.message);
        });
});

exports.createUserAccount = functions.auth.user().onCreate(event => {
    console.log('event.data= ', event.data);
    const uid = event.data.uid;
    const name = event.data.displayName || `Guest#${random()}`;
    return ref.child(`/users/${uid}`).set({ name });
});

exports.newUserJoinedLeague = functions.database.ref('/leagues/{leagueId}/users').onWrite(event => {
    const snapshot = event.data.current;
    if(snapshot.numChildren() === MAX_USERS_IN_LEAGUE) {
        console.log(`changing league ${event.params.leagueId} state from new to select_draft_order`);
        return ref.child(`/leagues/${event.params.leagueId}/state`).set('select_draft_order');
    } 

    return Promise.resolve();
});

exports.api = functions.https.onRequest(app);