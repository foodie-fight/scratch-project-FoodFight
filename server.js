const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userController = require('./user/userController');
const cookieController = require('./util/cookieController');
const sessionController = require('./session/sessionController');
app.use(cookieParser())

app.use(express.static(__dirname + '/www'));
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(3000);
const io = require('socket.io').listen(server);

//users array stores our user socket connections
let users = [];

//test variable
let name = '';
let counter = 0;
let voters = [];
// const fs = require('fs');




// Add name to vote list
// create cookie to persist and prevent multiple votes by same person

app.post('/', [userController.createUser, cookieController.setSSIDCookie, sessionController.startSession]);



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
  
  socket.on('yesVote', function(data){
    // we increment the vote count on the server for every vote click
    if (voters.indexOf(socket.id) === -1){
      counter += 1;
      voters.push(socket.id)
    }
    // on 'returnYes' event, we emit pass an obj as 
    socket.emit('onReturnYes', { name: data.name, count : counter})
    socket.broadcast.emit('voteCountUpdate', { count: counter }) //********
  });

});//ends io.socket.on.connect
//logs when connected to server
console.log('connected to server');


