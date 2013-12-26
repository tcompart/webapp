var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  routes = require('../routes/routes'),
  config = require('./config');

var csrfValue = function (req) {
  var token = (req.body && req.body._csrf)
    || (req.query && req.query._csrf)
    || (req.headers['x-csrf-token'])
    || (req.headers['x-xsrf-token']);
  return token;
};

var app = express();
app.use(express.favicon());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.cookieParser('your secret here'));
app.use(express.cookieSession());
app.use(express.csrf({value : csrfValue}));
app.use(app.router);
app.use(function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});
app.use(express.static(__dirname + '/../public'));
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});
app.listen(config.port);

app.post('/api/article', function (req, res, data) {
  function isValid(article) {
    return (article && article.title && article.content);
  }
  if (isValid(req.body.article)) {
    res.writeHead(201, "Article created");
  } else {
    res.writeHead(400, "Bad request");
  }
  res.end();
});
