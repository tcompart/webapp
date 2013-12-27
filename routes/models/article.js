var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Article;

module.exports.init = function () {
  var ArticleSchema = new Schema({
      title: String,
      url: String,
      content: String
    });

  ArticleSchema.virtual('date').get(function () {
    return this._id.getTimestamp();
  });
  Article = mongoose.model('Article', ArticleSchema);
};

module.exports.getArticles = function (req, res, data) {
  Article.find({}, {'title': 1, 'content': 1, '_id': 0}, function (err, articles) {
    if (err) {
      throw new Error(err);
    }
    res.json(articles);
    res.end();
  });
};

module.exports.addArticle = function (req, res, data) {
  function isValid(article) {
    return (article && article.title && article.content);
  }
  if (isValid(req.body.article)) {
    var article = new Article(req.body.article);
    article.save(function (err, article) {
      if (err) {
        console.error("Article could not be stored: ", article);
        res.writeHead(500, "Internal server error");
      } else {
        res.writeHead(201, "Article created");
      }
      res.end();
    });
  } else {
    res.writeHead(400, "Bad request");
    res.end();
  }
};

