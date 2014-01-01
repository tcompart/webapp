/*globals db*/
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Article;

module.exports.init = function () {
  var ArticleSchema = new Schema({
    title: String,
    url: String,
    content: String,
    created_at: { type: Date },
    updated_at: { type: Date }
  });

  ArticleSchema.pre('save', function (next) {
    this.updated_at = new Date();
    if (!this.created_at) {
      this.created_at = new Date();
    }
    next();
  });

  Article = mongoose.model('Article', ArticleSchema);
};

module.exports.getArticles = function (req, res, data) {
  Article.find({}, {'_id': 1, 'title': 1, 'content': 1}, function (err, articles) {
    if (err) {
      throw new Error(err);
    }
    console.log("Articles were requested, and will answer with ", articles.length, " articles.");
    res.json(articles, 200);
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
        console.log("Created and added article: ", article);
        res.writeHead(201, "Article created");
      }
      res.end();
    });
  } else {
    res.writeHead(400, "Bad request");
    res.end();
  }
};

module.exports.deleteArticle = function (req, res, data) {
  var articleId = req.params.id;
  Article.findById(articleId, function (err, article) {
    if (err) {
      console.error("Error while deleting article '", articleId, "': ", err);
    } else {
      console.log("Deleting and confirming deletion of article: ", article);
      article.remove(function () {
        res.json(article, 200);
        res.end();
      });
    }
  });
};