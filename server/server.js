require('newrelic');
var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  routes = require('../routes/routes'),
  config = require('./config'),
  article = routes.article;

console.log("",article);

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

var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express server started on port %s with environment %s', port, process.env.NODE_ENV);

app.get('/api/articles', article.getArticles);
app.post('/api/articles', article.addArticle);
