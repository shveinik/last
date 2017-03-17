const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const User         = require('../models/user');

const EventSchema = new Schema({

      _supplier   : { type: Schema.ObjectId, ref: 'User' },
      text        : String,
      type : {
        type: [String],
        enum: ['Lection',
               'Brewing Session',
               'Smt',

             ]
                  },
      location    : Array,
      header      : String

    });

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
