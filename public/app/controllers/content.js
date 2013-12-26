var app = angular.module('webapp.articles', ['webapp.messages']);

app.factory('ArticleService', ['$http', function ($http) {
  return {
    getArticles : function () {
      return [ { title : "Titel 1", content: "Content2 for a very long " } ];
    },

    addArticle : function (inputtitle, inputcontent, callback) {
      var finishedSuccessfully = false;
      $http.post('/api/article', { "article" : {
        "title": inputtitle,
        "content" : inputcontent
      }})
        .success(function (data, status, headers, config) {
          if (status === 201) {
            callback();
          }
        });
      return true;
    }
  };
}]);

app.controller('ContentCtrl', ['$scope', 'ArticleService', 'Version', 'MessageService', function ($scope, articleService, version, messageService) {
  $scope.articles = articleService.getArticles();
  $scope.underEdit = false;
  $scope.contentVersion = version;

  $scope.showNewArticleDiv = function () {
    $scope.underEdit = true;
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