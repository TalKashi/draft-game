const functions = require('firebase-functions');
const admin = require(`firebase-admin`);
admin.initializeApp(functions.config().firebase);
const ref = admin.database().ref();

exports.createUserAccount = functions.auth.user().onCreate(event => {
    console.log('event.data= ', event.data);
    const uid = event.data.uid;
    const name = event.data.displayName || `Guest#${random()}`;
    return ref.child(`/users/${uid}`).set({name});
});

function random() {
    return Math.floor(Math.random() * 1000);
}
