  
const express = require('express');
const app = express();
const server = require('http').Server(app);
const socket = require('socket.io');
const io = socket(server);
const fs = require('fs');


app.use(express.static(__dirname + '/www'));


io.on('connect', function () {
  console.log('connected')
})



server.listen(3000)