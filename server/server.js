/*jslint es5: true */

var newrelic = require('newrelic');
var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  routes = require('../routes/routes'),
  config = require('./config'),
  https = require('https'),
  http = require('http'),
  article = routes.article;

var csrfValue = function (req) {
  var token = (req.body && req.body._csrf)
    || (req.query && req.query._csrf)
    || (req.headers['x-csrf-token'])
    || (req.headers['x-xsrf-token']);
  return token;
};

var supportAngularXSRFToken = function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
};

var supportCrossOriginResourceSharingRequests = function (req, res, next) {
  var origin = (req.headers.origin || "*");
  res.set('Access-Control-Allow-Origin', origin);
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTION');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  if ('OPTIONS' === req.method) {
    res.set('Access-Control-Allow-Max-Age', 10);
    res.set('Content-Length', 0);
    return res.send(204, "No Content");
  }
  next();
};

var secure_url_redirect = function (req, res) {
  return res.redirect(301, ['https://', req.host, ":", config.secure_port || 443, req.originalUrl].join(''));
};

var supportSecureConnectionsOnlyOnHeroku = function (req, res, next) {
  if (process.env.NODE_ENV === "production") {
    res.setHeader('Strict-Transport-Security', 'max-age=8640000; includeSubDomains');
    if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === "http") {
      return secure_url_redirect(req, res);
    }
  }
  next();
};

var supportSecureConnectionsOnly = function (req, res, next) {
  if (process.env.NODE_ENV !== "production" && !req.secure) {
    return secure_url_redirect(req, res);
  }
  next();
};

var app = express();
app.use(express.favicon());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.logger());
app.use(express.cookieParser('JR[f8L-kyUav-4VSXp;[On)EtWyR6T'));
app.use(express.cookieSession());
app.use(express.csrf({value : csrfValue}));
app.use(supportCrossOriginResourceSharingRequests);
app.use(supportAngularXSRFToken);
app.use(app.router);

app.use(supportSecureConnectionsOnlyOnHeroku);
app.use(supportSecureConnectionsOnly);

app.use(express.static(__dirname + '/../public'));
process.on('uncaughtException', function (err) {
  console.error("Critical uncaught error was thrown: ", err);
});

var https_options = {
  key: fs.readFileSync('./server/ssl/privateKey.pem'),
  cert: fs.readFileSync('./server/ssl/privateCert.pem')
};

var port = process.env.PORT || config.port;
var secure_port = config.secure_port || 443;
var http_server = http.createServer(app).listen(port, function () {
  console.log('Express server started on port %s with environment %s', port, process.env.NODE_ENV);
});
var https_server = https.createServer(https_options, app).listen(secure_port, function () {
  console.log('Secure express server started on port %s with environment %s', secure_port, process.env.NODE_ENV);
});

app.get('/api/articles', article.getArticles);
app.post('/api/articles', article.addArticle);
app.delete('/api/articles/:id', article.deleteArticle);
