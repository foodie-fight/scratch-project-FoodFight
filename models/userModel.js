var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var bcrypt = require('bcryptjs');
var userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

// userSchema.pre('save', function(next) {
//   bcrypt.genSalt(10, (err, salt) => {
//     if(err) return next(err);
//     bcrypt.hash(this.password, salt, (err, hash) => {
//       if(err) return next(err);
//       this.password = hash;
//       next();
//     })
//   })
// })

module.exports = mongoose.model('User', userSchema);