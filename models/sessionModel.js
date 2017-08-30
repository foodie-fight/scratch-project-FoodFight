const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 30, default: Date.now },
  socketId: {type: String}
});

module.exports = mongoose.model('Session', sessionSchema);