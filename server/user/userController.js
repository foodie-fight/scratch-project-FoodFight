const User = require('./userModel');
const cookieController = require('./../util/cookieController');
const sessionController = require('./../session/sessionController');

const userController = {};
// probably going to need to create a DB to save users to.
// can set a setTimeout to delete from DB after certain amount of time.
// create new voter

userController.createUser = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.render('/', { error: 'errorrororo' })
    res.end()
  } else {
      let newUser = {
      username: //probably socket id on res.body,
      });

      // save user to DB or server
  })

  next();
  }
};


// verifyUser - Obtain username from the request body, locate
// the appropriate user in the database, and then authenticate the submitted password
// against the password stored in the database.

userController.verifyUser = (req, res, next) => {
 
  User.findOne({ username: req.body.username }, function (err, users) {
    if (err) throw err;
    // console.log(users)
    if (users === null) {
      res.redirect('/signup')
    } else if (users.password === req.body.password) {
      next();
    } else {
      res.redirect('/signup')
    }
  })

};

module.exports = userController;
