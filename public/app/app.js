var webapp = angular.module('webapp', ['webapp.articles', 'webapp.authentication', 'webapp.styling', 'webapp.routing']);
webapp.constant('Version', '0.1');

webapp.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
