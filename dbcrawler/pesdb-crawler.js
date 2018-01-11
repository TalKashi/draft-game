const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const Promise = require('bluebird');

let options = {
    uri: 'http://pesdb.net/pes2018/',
    transform: body => cheerio.load(body)
}

const lastPage = 297;
const headerMeaning = {
    '0': 'position',
    '1': 'name',
    '2': 'team',
    '3': 'nationality',
    '4': 'height',
    '5': 'weight',
    '6': 'age',
    '7': 'condition',
    '8': 'rating'
};
let headers = {};
let players = require('../2018db');
let allPromises = [];

for (let i = 1; i <= lastPage; i++) {
    allPromises.push({ uri: `http://pesdb.net/pes2018/?page=${i}`, transform: body => cheerio.load(body) });
}
console.log(allPromises);
nextRequest(89);

function savePlayers() {
    fs.writeFileSync('./2018db.json', JSON.stringify(players, null, 2));
}

function nextRequest(reqNum) {
    if (reqNum == allPromises.length) {
        console.log('writing file');
        savePlayers();

        return;
    }

    request(allPromises[reqNum])
        .then(processTable)
        .then((_players) => {
            console.log('finished requst number ' + reqNum);
            players = players.concat(_players);
            if (reqNum != allPromises.length) {
                reqNum++;
                setTimeout(nextRequest, 5000, reqNum);
                // nextRequest(reqNum);
            }
        })
        .then(() => console.log('players.lenth=', players.length))
        .catch(err => {
            console.log('ERROR: ', err);
            savePlayers();
        });
}

function processTable($) {
    console.log('started process table');
    let _players = [];
    let playerCount = -1;
    $('table.players tr').each((i, elem) => {
        // console.log('th.length=',$(elem).find('th').length);
        $(elem).find('th').each((i, elem) => {
            headers[i] = $(elem).text();
            // console.log(headers);
        });
        // console.log('td.length=',$(elem).find('td').length);

        $(elem).find('td').each((i, elem) => {
            if (i === 0) {
                // console.log('incremeanting player count. before= ', playerCount);
                playerCount = playerCount + 1;
                _players.push({});
            }

            let player = _players[playerCount];
            if (i === 1) {
                player.id = $(elem).children().first().attr('href').slice('./?id='.length);
            }

            if (i !== 7) {
                // console.log(`current player count=${playerCount}, row count=${i}`);
                player[headerMeaning[i]] = $(elem).text();
            }
            // console.log(headers);
        });
    });

    console.log('finished request. _players.length=', _players.length);
    return _players;
}


// request(options)
// .then($ => {
//     console.log($('table.players tr').length)
//     let playerCount =-1;
//     $('table.players tr').each((i, elem) => {
//         // console.log('th.length=',$(elem).find('th').length);
//         $(elem).find('th').each((i, elem) => {
//             headers[i] = $(elem).text();
//             // console.log(headers);
//         });
//         // console.log('td.length=',$(elem).find('td').length);

//         $(elem).find('td').each((i, elem) => {
//             if(i === 0) {
//                 console.log('incremeanting player count. before= ', playerCount);
//                 playerCount = playerCount + 1;
//                 players.push({});
//             }

//             let player = players[playerCount];
//             if(i === 1) {
//                 player.id = $(elem).children().first().attr('href').slice('./?id='.length);
//             }
//             console.log('current player count=' + playerCount);
//             player[headers[i]] = $(elem).text();
//             // console.log(headers);
//         });
//     })

//     })
// .then(()=> {
//     console.log(headers);
//     console.log(players);
// })
// .catch(err => console.log('error: ', err));