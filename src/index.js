'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv/config';
import Mail from './models/mail';
import routes from './routes/index';

const port = process.env.PORT || 8080;
const app = express();
// const router = express.Router();

// // configure app to use bodyParser()
// // this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

console.log('__dirname', __dirname);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect(`mongodb://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.HOST}/hate-mail`, {
  useMongoClient: true,
});

// middleware to use for all requests
app.use(function(req, res, next) {
  next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', routes);

app.listen(port);
console.log('Running on port ' + port);