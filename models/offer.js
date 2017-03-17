const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const User         = require('../models/user');

const OfferSchema = new Schema({

      _supplier   : { type: Schema.ObjectId, ref: 'User' },
      header      : String,
      text        : String,
      equipment : {
        type: [String],
        enum: ['Low Temperature Fermentation Chamber',
               'Middle Temperature Fermentation Chamber',
               'Grain mill',
               'Full brewing cycle',
               'Fruit crusher',
               'Fruit press',
             ]
                  },
      location    : Array,
      comments    : Array,
      raiting     : Number,
      image       : String
    });

const Offer = mongoose.model("Offer", OfferSchema);

module.exports = Offer;
