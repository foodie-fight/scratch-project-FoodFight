const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const userController = require('./controllers/userController.js')
const sessionController = require('./controllers/sessionController.js')
const cookieController = require('./controllers/cookieController.js')
const User = require('./models/userModel')
// const mexImage = require('./build/001_Tacos_de_carnitas,_carne_asada_y_al_pastor.jpg')
const mexican = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
const japanese = 'https://www.litchfieldbeach.com/images/sushi-myrtle-beach.jpg'
const chinese = 'https://images.chinahighlights.com/allpicture/2014/08/703569837fea4a92834556bf_300x200.jpg'
const italian = 'http://food.sndimg.com/img/upload/400x300/International-Italian_gailanng_9528.jpg'
let users = [];
let chineseCounter = 0;
let japaneseCounter = 0;
let mexicanCounter = 0;
let italianCounter = 0;
let voters = [];

mongoose.connect('mongodb://foods:123@ds163053.mlab.com:63053/foodtinder');
mongoose.connection.once('open', () => {
  console.log('connected with mongoDB');
})

app.use(express.static(__dirname + '/build'));
app.use(bodyParser.urlencoded({ extended: true }));
const server = app.listen(3000, () => {
    console.log('now listening on 3000!');
});
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './build/index.html'))
})
app.get('/logged', (req,res) => {
    (req,res,next) => {
        console.log('logging in')
        next()
    }
    sessionController.startSession,
    res.sendFile(path.join(__dirname, 'login.html'))
})
app.get('/signup', (req,res) => {
    res.sendFile(path.join(__dirname, 'signup.html'))
})
app.post('/signup', 
    userController.createUser,
    (req,res, next) => {
        console.log(req.body ,"request body from sign up")
        res.redirect('/')
})
app.post('/logged', 
    userController.verifyUser,
    cookieController.setSSIDCookie,
    sessionController.startSession,
    (req,res, next) => {       
        User.findOne({username: req.body.username}, (err, userd) => {
            users.push(userd)
        })
        console.log('testing users', users)
        res.redirect('/logged')
})

// app.get('/logged', sessionController.isLoggedIn, function(req, res) {
//   userController.getAllUsers(function(err, users) {
//       console.log('this is users ', users)
//     if (err) throw err;
//     res.sendFile(path.join(__dirname, 'login.html'))
//   });
// });


const io = require('socket.io').listen(server);
//users array stores our user socket connections

app.set('view engine', 'ejs');
app.use(cookieParser())

// Add name to vote list
// create cookie to persist and prevent multiple votes by same person
//listens for connect event when users join our poll
io.sockets.on('connect', function (socket) {
    //pushes new users into our user collection (aka socket connections)
    // users.push(socket);
    let currUser = users[users.length-1]
    console.log(currUser, 'this is currUser');
    console.log(voters, 'this is voters')
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
        console.log('yesChinese', data)
        // User.find({},(err,data) => {
        //     // console.log(' this is logged data' , data)
        // })
        // User.findOneAndUpdate({username:currUser.username},{socketId: socket.id},(err,data) => {
        //     console.log(data, 'hopefully something returns')
        // })
        // let socketId = data;
        // if (!currUser[socketId] && voters.indexOf(currUser.username) === -1) {
        if (voters.indexOf(currUser.username) === -1) {
            chineseCounter += 1;
            socket.emit('onReturnYesChinese', { count4Chinese: chineseCounter })
            socket.broadcast.emit('voteCountUpdateChinese', { count4Chinese: chineseCounter })
            voters.push(currUser.username)
            // currUser[socketId] = data
            console.log(voters, "this is voters")
            console.log(voters.indexOf(currUser.username, 'this is currUser.username'))
            // console.log(currUser[socketId], 'this is socketID')
        } else {
            console.log('error')
        }
    });
    socket.on('yesJapanese', function (data) {
        // let socketId = data;
        // if (!currUser[socketId] && voters.indexOf(currUser.username) === -1) {
        if (voters.indexOf(currUser.username) === -1) {
            japaneseCounter += 1;
            socket.emit('onReturnYesJapanese', { count4Japanese: japaneseCounter })
            socket.broadcast.emit('voteCountUpdateJapanese', { count4Japanese: japaneseCounter })
            voters.push(currUser.username)
            // currUser[socketId] = data
            console.log(voters, "this is voters")
            console.log(voters.indexOf(currUser.username, 'this is currUser.username'))
            // console.log(currUser[socketId], 'this is socketID')
        } else {
            console.log('error')
        }
    });
    socket.on('yesMexican', function (data) {
        // let socketId = data;
        // if (!currUser[socketId] && voters.indexOf(currUser.username) === -1) {
        if (voters.indexOf(currUser.username) === -1) {
            mexicanCounter += 1;
            socket.emit('onReturnYesMexican', { count4Mexican: mexicanCounter })
            socket.broadcast.emit('voteCountUpdateMexican', { count4Mexican: mexicanCounter })
            voters.push(currUser.username)
            // currUser[socketId] = data
            console.log(voters, "this is voters")
            console.log(voters.indexOf(currUser.username, 'this is currUser.username'))
            // console.log(currUser[socketId], 'this is socketID')
        } else {
            console.log('error')
        }
    });
    socket.on('yesItalian', function (data) {
        // let socketId = data;
        // if (!currUser[socketId] && voters.indexOf(currUser.username) === -1) {
        if(!currUser) return
        if (voters.indexOf(currUser.username) === -1) {
            italianCounter += 1;
            socket.emit('onReturnYesItalian', { count4Italian: italianCounter })
            socket.broadcast.emit('voteCountUpdateItalian', { count4Italian: italianCounter })
            voters.push(currUser.username)
            // currUser[socketId] = data
            console.log(voters, "this is voters")
            console.log(voters.indexOf(currUser.username, 'this is currUser.username'))
            // console.log(currUser[socketId], 'this is socketID')
        } else {
            console.log('error')
        }
    });
    socket.on('yesCollection', function (data) {
        let cuisineList = [italianCounter,japaneseCounter,chineseCounter,mexicanCounter]
        let maxCount = Math.max.apply(null, cuisineList)
        let winners = []
        let answer;
        let winningPicture;
        if(cuisineList.indexOf(maxCount) === cuisineList.indexOf(italianCounter)){
            if(winners.indexOf('Italian') === -1){
                winners.push('Italian')
                winningPicture = italian
            }
        }
        if(cuisineList.indexOf(maxCount) === cuisineList.indexOf(chineseCounter)){
            if(winners.indexOf('Chinese') === -1){
                winners.push('Chinese')
                winningPicture = chinese
            }        }
        if(cuisineList.indexOf(maxCount) === cuisineList.indexOf(japaneseCounter)){
            if(winners.indexOf('Japanese') === -1){
                winners.push('Japanese')
                winningPicture = japanese
            }        }
        if(cuisineList.indexOf(maxCount) === cuisineList.indexOf(mexicanCounter)){
            if(winners.indexOf('Mexican') === -1){
                winners.push('Mexican')
                winningPicture = mexican
            }        }
        if(!winners.length){answer = ''}
        console.log(winningPicture, "this is the winning picture")
        if(winners.length === 1){
            answer = `the winner is ${winners[0]}`
            socket.emit('onReturnCollector', { winner: answer, image: winningPicture })
            socket.broadcast.emit('voteCountUpdateCollector', { winner: answer, image: winningPicture })
        }
        if(winners.length > 1){
            answer = `the winners are ${winners}`
            socket.emit('onReturnCollector', { winner: answer, image: winningPicture })
            socket.broadcast.emit('voteCountUpdateCollector', { winner: answer, image: winningPicture })
        }
        
    });
});//ends io.socket.on.connect
//logs when connected to server