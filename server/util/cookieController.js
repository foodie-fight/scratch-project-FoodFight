
const sessionController = require('./../session/sessionController');
const User = require('../user/userModel');

const cookieController = {};
cookieController.setCookie = setCookie;
cookieController.setSSIDCookie = setSSIDCookie;


//setCookie - set a cookie with a random number

function setCookie(req, res, next) {
  let randomNumber = Math.floor(Math.random() * 999)
  res.cookie('getToVoting', randomNumber, { maxAge: 900000, httpOnly: true });


  res.cookie('something in here', 'hello ypung person, i\'m old and tired', { maxAge: 900000, httpOnly: true });
  console.log('cookie created successfully');


}

function setSSIDCookie(req, res, next) {
  
  User.findOne({ username: /*probably socket.id*/ }, function (err, socket) {
    
    if (err) throw err;
    
    res.cookie('ssid', /*socket._id*/, { maxAge: 900000, httpOnly: true });
    res.local = socket
    next();
  })

}

module.exports = cookieController;
