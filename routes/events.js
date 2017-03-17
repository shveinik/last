var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const Event = require('../models/event');
const upload = require('../config/multer');
const User = require('../models/user');


router.get('/', (req, res, next) => {
  Event.find({})
    .exec((err, Events) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Events);
    });
});

router.get('/:id', (req, res, next) => {
  let eventId = req.params.id;
    Event.findById(eventId)
    .exec((err, events) => {
      if (err) {
        return res.send(err);
      }
      User.find({'_id' : events._supplier},(err, user)=>{
        if (err) {
          next(err);
        } else {
          return res.json({user: user, events: events});
    }
    });
});
});


router.get('/search/:event', (req, res, next) => {
  let ev = req.params.event;
  Event.find({type : ev})
    .exec((err, Events) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Events);
    });
});




router.post("/", (req, res, next) => {
  var text = req.body.text;
  var header = req.body.header;
  var location = req.body.location;
  var _supplier = req.body._supplier;
  var type = req.body.type;



    var event = new Event({
      text,
      location,
      _supplier,
      type,
      header
    });

    event.save((err) => {
        if (err) {
          return res.send(err);
        }


        return res.json({
          message: 'New event created!',
          event: event,
        });
      });


});

router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Event.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Event has been removed!'
    });
  });
});

router.get('/edit/:id', (req, res, next) => {
  let eventId = req.params.id;
    Event.findById(eventId)
    .exec((err, events) => {
      if (err) {
        return res.send(err);
      }
      User.find({'_id' : events._supplier},(err, user)=>{
        if (err) {
          next(err);
        } else {
          return res.json({user: user, events: events});
    }
    });
});
});


router.put("/update/:id", (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Event.findByIdAndUpdate(req.params.id, {
    text : req.body.text,
    header: req.body.header,
    location : req.body.location,
    _supplier : req.body._supplier,
    type : req.body.type
  }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Updated successfully'
    });
  });
});



module.exports = router;
