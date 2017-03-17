var express = require('express');
var router = express.Router();
const Message = require('../models/message');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Messages' });
});



router.post("/new", (req, res, next) => {
  var text = req.body.text;
  var reciever = req.body.reciever;
  var sender = req.body.sender;
  var created = new Date();
  var senderName = req.body.senderName;



    var message = new Message({
      sender,
      reciever,
      text,
      created,
      senderName
    });

    message.save((err) => {
        if (err) {
          return res.send(err);
        }


        return res.json({
          // message: 'Message sent',
          message: message
        });
      });


});

router.get('/check/:id', (req, res, next) => {
let userId = req.params.id;
  Message.find({reciever : userId})
    .exec((err, messages) => {
      if (err) {
        return res.send(err);
      }
          return res.json({messages: messages});

    });
});





module.exports = router;
