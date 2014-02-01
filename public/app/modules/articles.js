var app = angular.module('webapp.articles', ['webapp.messages']);

app.factory('ArticleService', ['$http', function ($http) {
  return {
    getArticles : function (callback) {
      $http.get('/api/articles').
      success(function (data, status, headers, config) {
        var articles = [];
        angular.forEach(data, function (article) {
          articles.push({
            id: article._id,
            title: article.title,
            content: article.content
          });
        });
        callback(null, articles);
      }).error(function () {
        var errorMsg = "Unable to retrieve articles from server.";
        console.error(errorMsg);
        callback(new Error(errorMsg), []);
      });
    },

    addArticle : function (inputtitle, inputcontent, callback) {
      $http.post('/api/articles', { "article" : {
        "title": inputtitle,
        "content" : inputcontent
      }}).
      success(function (data, status, headers, config) {
        if (status === 201) {
          callback();
        }
      }).
      error(function () {
        callback(new Error("unable to add article: " + inputtitle));
      });
    },

    deleteArticle : function (article, callback) {
      if (article && article.id) {
        $http['delete']('/api/articles/' + article.id, {"id": article.id}).
        success(function (data, status) {
          if (status === 200) {
            callback(null, data);
          }
        }).
        error(function () {
          callback(new Error("unable to delete article: " + article.title));
        });
      }
    }
  };
}]);

app.controller('ArticlesCtrl', ['$scope', 'ArticleService', 'Version', 'MessageService', function ($scope, articleService, version, messageService) {

  articleService.getArticles(function (err, data) {
    $scope.articles = data;
    $scope.currentArticle = data[0];
  });
  $scope.underEdit = false;
  $scope.contentVersion = version;

  $scope.showNewArticleDiv = function () {
    $scope.underEdit = true;
  };

  $scope.showArticle = function (article) {
    $scope.currentArticle = article;
  };

  $scope.showDeleteAction = function (article) {
    $scope.showDeleteButton = article;
  };

  $scope.hideDeleteAction = function (article) {
    if ($scope.showDeleteButton === article) {
      $scope.showDeleteButton = null;
    }
  };

  $scope.addArticle = function () {
    articleService.addArticle($scope.title, $scope.content, function (err) {
      if (err) {
        messageService.addMessage("Failed to publish article '" + $scope.title + "'.");
        messageService.setStateError();
      } else {
        messageService.addMessage("Article '" + $scope.title + "' was published.");
        messageService.setStateOk();
        articleService.getArticles(function (err, articles) {
          $scope.articles = articles;
        });
        $scope.underEdit = false;
        $scope.title = "";
        $scope.content = "";
      }
    });
  };

  $scope.deleteArticle = function (article) {
    articleService.deleteArticle(article, function (err, committedDeletedArticle) {
      if (err) {
        messageService.addMessage("Failed to delete article '" + article.title + "'.");
        messageService.setStateError();
      } else {
        messageService.addMessage("Article '" + article.title + "' was deleted.");
        messageService.setStateOk();
        articleService.getArticles(function (err, articles) {
          $scope.articles = articles;
        });
      }
    });
  };
}]);