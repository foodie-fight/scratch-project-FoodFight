var User = require('./../models/userModel');
var sessionController = require('./sessionController');

var cookieController = {};
cookieController.setCookie = setCookie;
cookieController.setSSIDCookie = setSSIDCookie;

function setCookie(req, res, next) {
  res.cookie('codesmith', 'hi');
  res.cookie('secret', Math.floor(Math.random() * 100))
  next();
}

function getUserId(username, callback) {
  User.find({username: username}, (err, user) => {
    if(err) throw err;
    callback(user[0]["_id"]);
  })
}

function setSSIDCookie(req, res, next) {
  getUserId(req.body.username, function(id) {
    console.log(id, 'this is id')
    res.cookie('ssid', id, { httpOnly: true, Expires: Date.now() + (5 * 60 * 1000) })
    res.ssid = id;
    next();
  });

}

module.exports = cookieController;