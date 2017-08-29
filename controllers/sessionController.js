let Session = require('./../models/sessionModel');
let sessionController = {};

// sessionController.isLoggedIn = function(req, res, next) {
//   if(req.cookies.ssid) {
//     Session.find({cookieId: req.cookies.ssid}, (err, data) => {
//       if(err) throw err;
//       return !data.length ? res.redirect('/signup') : next();
//     })
//   } else {
//     // res.redirect('/signup')
//     sessionController.startSession()
//   }
// };

sessionController.isLoggedIn = function(req, res, next) {
  if(req.cookies.ssid) {
    Session.find({cookieId: req.cookies.ssid}, (err, data) => {
      if(err) throw err;
      return !data.length ? res.redirect('/signup') : next();
    })
  } else {
    // res.redirect('/signup')
    sessionController.startSession()
  }
};

sessionController.startSession = function(req, res) {
  console.log('start session cotroller hit')
  Session.create({cookieId: res.ssid}, (err) => {
    if (err) throw err;
    else return res.redirect('/logged');
  })
};

module.exports = sessionController;