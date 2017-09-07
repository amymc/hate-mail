'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv/config';
import Mail from './models/mail';

const port = process.env.PORT || 8080;
const app = express();
const router = express.Router();

// // configure app to use bodyParser()
// // this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect(`mongodb://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.HOST}/hate-mail`, {
  useMongoClient: true,
});

// middleware to use for all requests
router.use(function(req, res, next) {
  next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.route('/mail')
  // .post(function(req, res) {
  //   let mailItem = new Mail();
  //   mailItem.bodyText = req.body.bodyText;
  //   mailItem.name = req.body.name;

  //   mailItem.save(function(err) {
  //     res.json({ message: 'New mail created!' });
  //   });
  // })

  .get(function(req, res) {
    Mail.find(function(err, mailItems) {
      if (err)
        res.send(err);

      res.json(mailItems);
    });
  });

// router.route('/mail/:name/:to/:from')
//   .get(function(req, res) {

//     Mail.findOne({'name': req.params.name} , function(err, mailItem) {
//       if (err)
//         res.send(err);

//       res.json(mailItem);
//     });
//   });


router.route('/period/:to/:from')
  .get(function(req, res) {
      res.json(`Hey ${req.params.to}, I'd rather have my period continuously for 100 years than spend another minute with you. Best, ${req.params.from}`);
  });

app.use('/', router);

app.listen(port);
console.log('Running on port ' + port);