let User = require('./../models/userModel');
// const cookieController = require('./cookieController');
// const sessionController = require('./session/sessionController');
const bcrypt = require('bcryptjs');
const path = require('path')

const userController = {};

userController.getAllUsers = (next) => {
  User.find({}, next);
};

userController.createUser = (req, res, next) => {
  let obj = {
    username: req.body.username,
    password: req.body.password
  }
  User.create(obj, (err) => {
    if (err) {
      res.render(path.join(__dirname, '../../client/signup.ejs'), { error : err }) //IMPORTANT LINE
    }
    else {
     next()
    }
  })
};

userController.verifyUser = function(req, res, next) {
  User.find({username: req.body.username}, (err, users) => {
    if(!users.length) return res.redirect('/signup');
    bcrypt.compare(req.body.password, users[0].password, function(err, resp) {
      if(err) throw err;
      else {
        return !resp ? res.redirect('/signup') : next();
      }
    })
  })
};
module.exports = userController;