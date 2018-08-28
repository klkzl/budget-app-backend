const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.listen(3000, function() {
  console.log('listening on 3000')
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, DELETE, POST, OPTIONS");
  next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/testB');

mongoose.connection.once('open', function() {
    console.log('connected');
}).on('error', function(error) {
    console.log('connection error: ', error);
});

module.exports = app;