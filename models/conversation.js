var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var conversation = new Schema({
  name: { type: String, default: 'New Conversation' },
  topic: { type: String, default: 'None'},
  users: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}] ,
  messages: [{type: mongoose.Schema.Types.ObjectId, ref:'Message'}],
  created_at: { type: Date, default: Date.now()},
  updated_at: { type: Date, default: Date.now },
  is_group: { type: Boolean, default: false}
});

module.exports = mongoose.model('Conversation', conversation);
