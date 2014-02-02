var app = angular.module('webapp.routing', ['webapp.articles', 'ui.router']);

var articlesList = {
  templateUrl: '/app/partials/articles/articles.list.html'
};

app.config(['$stateProvider', function ($stateProvider) {

  $stateProvider.state('contacts', {
    templateUrl: '/app/partials/contacts/contacts.list.html',
    controller: 'ContactsCtrl'
  }).state('navigation', {
    templateUrl: '/app/partials/main.html',
    controller: 'ArticlesCtrl'
  }).state('navigation.articles', {
    parent: 'navigation',
    views: {
      'top': {
        templateUrl: '/app/partials/navigation/top.html'
      },
      'content': {
        templateUrl: '/app/partials/articles/articles.div.html'
      },
      'side': articlesList
    }
  });
}]);

app.run(['$state', function ($state) {
  $state.transitionTo('navigation.articles');
}]);