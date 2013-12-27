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
        });
      return true;
    }
  };
}]);

app.controller('ContentCtrl', ['$scope', 'ArticleService', 'Version', 'MessageService', function ($scope, articleService, version, messageService) {
  articleService.getArticles(function (data) {
    $scope.articles = data;
  });
  $scope.underEdit = false;
  $scope.contentVersion = version;

  $scope.showArticle = function (index) {
    $scope.articleIndexPresented = index;
  };

  $scope.showNewArticleDiv = function () {
    $scope.underEdit = true;
  };

  $scope.currentArticle = function () {
    var index = $scope.articleIndexPresented;
    if (index && $scope.articles && $scope.articles.length > index) {
      return $scope.articles[index];
    }
    return {};
  };

  $scope.addArticle = function () {
    articleService.addArticle($scope.title, $scope.content, function () {
      messageService.addMessage("Article '" + $scope.title + "' was published.");
      $scope.articles = articleService.getArticles();
      $scope.underEdit = false;
      $scope.title = "";
      $scope.content = "";
    });
  };
}]);