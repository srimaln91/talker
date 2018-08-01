var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var message = new Schema({
  conversation: {type: mongoose.Schema.Types.ObjectId, ref:'Conversation'},
  from: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  message_body: String,
  message_status:{type: Boolean, default: false},
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', message);
