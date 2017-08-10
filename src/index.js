'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Mail from './models/mail';

require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();
const router = express.Router();

// // configure app to use bodyParser()
// // this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(`mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.host}/hate-mail`);

// middleware to use for all requests
router.use(function(req, res, next) {
  next();
});

router.route('/mail')
  .post(function(req, res) {
    const mailItem = new Mail();
    mailItem.bodyText = req.body.bodyText;

    mailItem.save(function(err) {
      res.json({ message: 'New mail created!' });
    });
  })

  .get(function(req, res) {
    Mail.find(function(err, mailItems) {
      if (err)
        res.send(err);

      res.json(mailItems);
    });
  });

// router.route('/curses/:curse_id')
//   .get(function(req, res) {
//     Curse.findById(req.params.curse_id, function(err, curse) {
//       if (err)
//         res.send(err);

//       res.json(curse);
//     });
//   })

//   .put(function(req, res) {
//     Curse.findById(req.params.curse_id, function(err, curse) {
//       if (err)
//         res.send(err);

//       curse.name = req.body.name;
//       curse.save(function(err) {
//           if (err)
//               res.send(err);

//           res.json({ message: 'Curse updated!' });
//       });
//     });
//   })

//   .delete(function(req, res) {
//     Curse.remove({
//       _id: req.params.curse_id
//     }, function(err, bear) {
//       if (err)
//         res.send(err);

//       res.json({ message: 'Successfully deleted' });
//     });
//   });

app.use('/', router);

app.listen(port);
console.log('Running on port ' + port);