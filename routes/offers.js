var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const Offer = require('../models/offer');
const upload = require('../config/multer');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  Offer.find({})
    .exec((err, Offers) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Offers);
    });
});

router.get('/:id', (req, res, next) => {
  let offerId = req.params.id;
    Offer.findById(offerId)
    .exec((err, offers) => {
      if (err) {
        return res.send(err);
      }
      User.find({'_id' : offers._supplier},(err, user)=>{
        if (err) {
          next(err);
        } else {
          return res.json({user: user, offers: offers});
    }
    });
});
});


router.get('/search/:equipment', (req, res, next) => {
  let eq = req.params.equipment;
  Offer.find({equipment : eq})
    .exec((err, Offers) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Offers);
    });
});


router.post("/", (req, res, next) => {
  var text = req.body.text;
  var header = req.body.header;
  var location = req.body.location;
  var _supplier = req.body._supplier;
  var equipment = req.body.equipment;



    var offer = new Offer({
      text,
      header,
      location,
      _supplier,
      equipment
    });

    offer.save((err) => {
        if (err) {
          return res.send(err);
        }


        return res.json({
          message: 'New offer created!',
          offer: offer,
        });
      });


});

router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Offer.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Offer has been removed!'
    });
  });
});


router.get('/edit/:id', (req, res, next) => {
  let offerId = req.params.id;
    Offer.findById(offerId)
    .exec((err, offers) => {
      if (err) {
        return res.send(err);
      }
      User.find({'_id' : offers._supplier},(err, user)=>{
        if (err) {
          next(err);
        } else {
          return res.json({user: user, offers: offers});
    }
    });
});
});



router.put("/update/:id", (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Offer.findByIdAndUpdate(req.params.id, {
    text : req.body.text,
    location : req.body.location,
    _supplier : req.body._supplier,
    equipment : req.body.equipment
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
