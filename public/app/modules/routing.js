var app = angular.module('webapp.routing', ['webapp.articles', 'ui.router']);

app.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('contacts', {
    templateUrl: '/app/partials/contacts/contacts.list.html',
    controller: 'ContactsCtrl'
  }).state('main', {
    templateUrl: '/app/partials/main.html',
    controller: 'ArticlesCtrl',
    abstract: true
  }).state('main.articles', {
    views: {
      'top': {
        templateUrl: '/app/partials/navigation/top.html'
      },
      'content': {
        templateUrl: '/app/partials/articles/articles.div.html'
      },
      'side': {
        templateUrl: '/app/partials/articles/articles.list.html'
      }
    }
  });
}]);

app.run(['$state', function ($state) {
  $state.go('main.articles');
}]);