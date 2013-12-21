var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  routes = require('../routes/routes'),
  config = require('./config');

var app = express();
app.use(app.router);
app.use(express.static(__dirname + '/../public'));
app.listen(config.port);

app.post('/api/article', function (req, res) {
	if (req.param) {
		console.log(req.param);
		res.writeHead(201, "Artice created");
	} else {
		res.writeHead(400, "Bad request");
	}
});
