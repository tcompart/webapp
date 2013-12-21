var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  config = require('../server/config');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

require('./models/models').initialize();