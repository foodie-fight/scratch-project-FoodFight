const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(express.static(__dirname + '/www'));
app.use(bodyParser.urlencoded({ extended: true }));
const server = app.listen(3000);
const io = require('socket.io').listen(server);
//users array stores our user socket connections
let users = [];
let chineseCounter = 0;
let japaneseCounter = 0;
let mexicanCounter = 0;
let italianCounter = 0;
let voters = [];
// Add name to vote list
// create cookie to persist and prevent multiple votes by same person
//listens for connect event when users join our poll
io.sockets.on('connect', function (socket) {
    //pushes new users into our user collection (aka socket connections)
    users.push(socket);
    console.log(users);
    //console logs how many users (sockets) are connected to our server
    console.log('Connected: %s users', users.length);
    //listens for disconnect event (when user leaves); fires only once
    socket.on('disconnect', () => {
        //grabs indexOf of disconnect user and splices just that one socket
        users.splice(users.indexOf(socket), 1);
        //calls disconnect to make sure socket/user disconnected
        socket.disconnect();
        //console logs how many sockets remain connected
        console.log('Disconnected: %s users remaining', users.length);
    });//ends socket.once.disconnect
    // //broadcasts to new user connection 
    // socket.emit('connected', {
    // });//ends socket.emit.welcome
    socket.emit('welcome', {
        count4Chinese: chineseCounter,
        count4Japanese: japaneseCounter,
        count4Mexican: mexicanCounter,
        count4Italian: italianCounter,
    })
    socket.on('yesChinese', function (data) {
        if (voters.indexOf(socket.id) === -1) {
            chineseCounter += 1;
            voters.push(socket.id)
        }
        socket.emit('onReturnYesChinese', { count4Chinese: chineseCounter })
        socket.broadcast.emit('voteCountUpdateChinese', { count4Chinese: chineseCounter }) //********
    });
    socket.on('yesJapanese', function (data) {
        if (voters.indexOf(socket.id) === -1) {
            japaneseCounter += 1;
            voters.push(socket.id)
        }
        socket.emit('onReturnYesJapanese', { count4Japanese: japaneseCounter })
        socket.broadcast.emit('voteCountUpdateJapanese', { count4Japanese: japaneseCounter }) //********
    });
    socket.on('yesMexican', function (data) {
        if (voters.indexOf(socket.id) === -1) {
            mexicanCounter += 1;
            voters.push(socket.id)
        }
        socket.emit('onReturnYesMexican', { count4Mexican: mexicanCounter })
        socket.broadcast.emit('voteCountUpdateMexican', { count4Mexican: mexicanCounter }) //********
    });
    socket.on('yesItalian', function (data) {
        if (voters.indexOf(socket.id) === -1) {
            italianCounter += 1;
            voters.push(socket.id)
        }
        socket.emit('onReturnYesItalian', { count4Italian: italianCounter })
        socket.broadcast.emit('voteCountUpdateItalian', { count4Italian: italianCounter }) //********
    });
});//ends io.socket.on.connect
//logs when connected to server
console.log('connected to server');