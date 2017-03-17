const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const OfferSchema = new Schema({

  raiting : Number,
  comments : Array

});

const Raiting = mongoose.model("Raiting", RaitingSchema);

module.exports = Raiting;
