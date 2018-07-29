var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
  name: {
    fname: String,
    lname: String,
    uname: String
  },
  email: String,
  password: {type: String, select: false},
  createdDate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('User', User);
