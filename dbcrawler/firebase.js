const admin = require('firebase-admin');
const serviceAccount = require('./league-9a9ec-firebase-adminsdk-gi6bj-13a6c8b269.json');
const players = require('./2018db.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://league-9a9ec.firebaseio.com"
});

let ref = admin.database().ref('/players/2018');
players.forEach(player => {
    ref.child(player.id).set(player);
});

// let ids = {};

// players.forEach((player, i) => {
//     if(ids[player.id]) {
//         console.log('found duplicate player=', player);
//     } else {
//         console.log(i)
//         ids[player.id] = true;
//     }
// });

// ref.child(players[0].id).set(players[0]);