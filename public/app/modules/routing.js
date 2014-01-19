var app = angular.module('webapp.routing', ['ui.router']);

app.controller('ContactsCtrl', ['$scope', '$state', function ($scope, $state) {
  $scope.change = function () {
    $state.go('articles.navigation');
  };
}]);

app.controller('ArticlesCtrl', ['$scope', '$state', function ($scope, $state) {
  $scope.change = function () {
    $state.go('contacts');
  };
}]);


app.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('contacts', {
    templateUrl: '/app/partials/contacts.list.html',
    controller: 'ContactsCtrl'
  }).state('articles', {
    templateUrl: '/app/partials/articles.list.html',
    controller: 'ArticlesCtrl',
    abstract: true
  }).state('articles.navigation', {
    views: {
      'top': {
        templateUrl: '/app/partials/navigation/top.html',
      },
      'articles': {
        templateUrl: '/app/partials/navigation/article.html',
      }
    }
  });
}]);

app.run(['$state', function ($state) {
  $state.go('contacts');
}]);