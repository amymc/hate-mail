'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv/config'
import Mail from './models/mail';

const port = process.env.PORT || 8080;
const app = express();
const router = express.Router();

// // configure app to use bodyParser()
// // this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect(`mongodb://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.HOST}/hate-mail`);

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

app.use('/', router);

app.listen(port);
console.log('Running on port ' + port);