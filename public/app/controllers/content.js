var app = angular.module('webapp.articles', ['webapp.messages']);

app.factory('ArticleService', ['$http', function ($http) {
  return {
    getArticles : function (callback) {
      $http.get('/api/articles').
        success(function (data, status, headers, config) {
          return callback(data);
        }).error(function () {
          console.error("Unable to retrieve articles from server.");
          return [];
        });
    },

    addArticle : function (inputtitle, inputcontent, callback) {
      var finishedSuccessfully = false;
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
    }
  };
}]);

app.controller('ContentCtrl', ['$scope', 'ArticleService', 'Version', 'MessageService', function ($scope, articleService, version, messageService) {
  articleService.getArticles(function (data) {
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

  $scope.addArticle = function () {
    articleService.addArticle($scope.title, $scope.content, function (err) {
      if (err) {
        messageService.addMessage("Failed to publish article '" + $scope.title + "'.");
        messageService.setStateWarn();
      } else {
        messageService.addMessage("Article '" + $scope.title + "' was published.");
        messageService.setStateOk();
        $scope.articles = articleService.getArticles();
        $scope.underEdit = false;
        $scope.title = "";
        $scope.content = "";
      }
    });
  };
}]);