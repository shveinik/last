var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Offer = require('../models/offer');
const Event = require('../models/event');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', (req, res, next) => {
let userId = req.params.id;
  User.findById(userId)
    .exec((err, user) => {
      if (err) {
        return res.send(err);
      }
      Event.find({'_supplier' : user._id},(err, events)=>{
        if (err) {
          next(err);
        }
      Offer.find({'_supplier' : user._id},(err, offers)=>{
        if (err) {
          next(err);
        } else {
          return res.json({user: user, offers: offers, events: events});



    }
    });
  });
});
});

router.patch("/addimage/:id", (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  console.log(req.body.image);
  User.findByIdAndUpdate(req.body._id, {
    image : req.body.image
  }, {new: true}, (err, user) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Updated successfully',
      user: user
    });
  });
});




module.exports = router;
