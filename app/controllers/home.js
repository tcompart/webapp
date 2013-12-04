/*global exports:false, mongoose:false*/
var mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  User = mongoose.model('User');

exports.index = function (req, res) {
  User.find(function (err, users) {
    if (err) {
      throw new Error(err);
    }
    res.render('home/index', {
      title: 'Logged In',
      users: users
    });
  });
  Article.find(function (err, articles) {
    if (err) { throw new Error(err); }
    res.render('home/index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
};