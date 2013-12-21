var app = angular.module('webapp');

app.factory('ArticleService', ['$http', function ($http) {
  return {
    getArticles : function () {
      return [ { title : "Titel 1", content: "Content2 for a very long " } ];
    },

    addArticle : function (title, content) {
      var finishedSuccessfully = false;
      $http.post('/api/article', { "article" : { "title" : title, "content" : content}})
        .success(function (data, status, headers, config) {
          if (status === 201) {
            finishedSuccessfully = true;
          }
        })
        .error(function (data, status, headers, config) {

        });
      return finishedSuccessfully;
    }
  };
}]);

app.controller('ContentCtrl', ['$scope', 'ArticleService', function ($scope, articleService) {
  $scope.version = '0.1';
  $scope.articles = articleService.getArticles();
  $scope.underEdit = true;

  $scope.addArticle = function (titel, content) {
    articleService.addArticle(titel, content);
  };
}]);