var mongoose = require('mongoose');

var logSchema = new mongoose.Schema({
  date: Date,
  departure: String,
  destination: String,
  duration: Number,
  remarks: String
});

module.exports = mongoose.model('Log', logSchema);
