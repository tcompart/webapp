var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  routes = require('../routes/routes'),
  config = require('./config');

var app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(app.router);
app.use(express.static(__dirname + '/../public'));
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
