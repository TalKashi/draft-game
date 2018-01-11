const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

let options = {
    uri: 'http://pesdb.net/pes2018/',
    transform: body => cheerio.load(body)
}

const headerMeaning = { 
    '0': 'Position',
'1': 'Player Name',
'2': 'Team Name',
'3': 'Nationality',
'4': 'Height',
'5': 'Weight',
'6': 'Age',
'7': 'Condition',
'8': 'Overall Rating' 
};
let headers = {};
let players = [];
request(options)
.then($ => {
    console.log($('table.players tr').length)
    let playerCount =-1;
    $('table.players tr').each((i, elem) => {
        // console.log('th.length=',$(elem).find('th').length);
        $(elem).find('th').each((i, elem) => {
            headers[i] = $(elem).text();
            // console.log(headers);
        });
        // console.log('td.length=',$(elem).find('td').length);
        
        $(elem).find('td').each((i, elem) => {
            if(i === 0) {
                console.log('incremeanting player count. before= ', playerCount);
                playerCount = playerCount + 1;
                players.push({});
            }

            let player = players[playerCount];
            if(i === 1) {
                player.id = $(elem).children().first().attr('href').slice('./?id='.length);
            }
            console.log('current player count=' + playerCount);
            player[headers[i]] = $(elem).text();
            // console.log(headers);
        });
    })
    
    })
.then(()=> {
    console.log(headers);
    console.log(players);
})
.catch(err => console.log('error: ', err));