const Session = require('./sessionModel');
const sessionController = {};


sessionController.isLoggedIn = (req, res, next) => {
   
Session.find({cookieId: req.cookies.ssid}, function (err, users) {
  if (err || !users.length) {
    res.redirect('/signup')
    } else {
  next();
  }
})
  next();
};


sessionController.startSession = (req, res, next) => {
  const mySession = {
  cookieId: res.local._id,
};
next();
};

module.exports = sessionController;
