const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Offer    = require('../models/offer');


const UserSchema = new Schema({

  username: String,

  password: String,

  email: String,

  phoneNumber: Number,

  // offers: [{type : Schema.Types.ObjectId, ref : "Offer"}],

  comments  : Array,

  raiting   : Number,

  image : {
    type : String,
    default : 'https://image.flaticon.com/icons/png/512/78/78373.png'
  }

});

const User = mongoose.model("User", UserSchema);


module.exports = User;
