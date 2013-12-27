/*global exports:false*/
var mongoose = require('mongoose'),
  config = require('../server/config');


mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('Unable to connect to database at ' + config.db);
});

db.on("open", function () {
  console.log("Connections established to database mongoDB.");
});

module.exports.article = require('./models/article');
module.exports.article.init();

module.exports.user = require('./models/user');
module.exports.user.init();