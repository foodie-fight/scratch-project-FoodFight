const express = require('express');
const app = express();

app.use(express.static(__dirname + '/www'));

const server = app.listen(3000);
const io = require('socket.io').listen(server);

//users array stores our user socket connections
const users = [];

//test variable
let name = '';
let counter = 0;
// const fs = require('fs');

//listens for connect event when users join our poll
io.sockets.on('connect', function (socket) {
  
  //listens for disconnect event (when user leaves); fires only once
  socket.once('disconnect', () => {
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
    counter++;
    // on 'returnYes' event, we emit pass an obj as 
    socket.emit('onReturnYes', { name: data.name, count : counter})
    socket.broadcast.emit('voteCountUpdate', { count: counter }) //********
  });

  //pushes new users into our user collection (aka socket connections)
  users.push(socket);

  //console logs how many users (sockets) are connected to our server
  console.log('Connected: %s users', users.length);

});//ends io.socket.on.connect

//logs when connected to server
console.log('connected to server');


