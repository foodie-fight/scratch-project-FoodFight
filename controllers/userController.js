let User = require('./../models/userModel');
const bcrypt = require('bcryptjs');
const path = require('path')

const userController = {};

userController.getAllUsers = () => {
  let answer;
  User.find({}, (err,data) => {
    answer = data
  });
  console.log(answer, "answer")
  return answer
};

userController.createUser = (req, res, next) => {
  let obj = {
    username: req.body.username,
    password: req.body.password
  }
  User.create(obj, (err) => {
    if (err) {
      res.render(path.join(__dirname, './../signup.html'))
    }
    else {
     next()
    }
  })
};

userController.verifyUser = (req, res, next) => {
  User.find({username: req.body.username}, (err, users) => {
    // console.log('this is a verified user', users)
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