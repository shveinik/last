const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const User         = require('../models/user');

const MessageSchema = new Schema({

  sender: { type: Schema.ObjectId, ref: 'User' },
  senderName: String,
  reciever: { type: Schema.ObjectId, ref: 'User' },
  text : String,
  created: {
         type: Date,
         default: new Date()
     },
  new: {
    type: Boolean,
    default :true
  }

});


const Message = mongoose.model("Message", MessageSchema);

 module.exports = Message;
