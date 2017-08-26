
const express = require('express');
const app = express();
const server = app.listen(3000);
const io = require('socket.io').listen(server);
const users = [];
const title = '';
const fs = require('fs');


app.use(express.static(__dirname + '/www'));
io.sockets.on('connect', function (socket) {
  console.log('connected');
  socket.emit('welcome', {
    title: title
  });
  users.push(socket);
  console.log('Connected: %s users', users.length);
  // console.log('socket:  ', socket);
  console.log('socket id:  ', socket.id);
});