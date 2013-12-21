/*global exports:false*/
var models = ['./article.js', './user.js'];

exports.initialize = function () {
  var i = 0;
  for (i = 0; i < models.length; i++) {
    require(models[i]);
  }
};