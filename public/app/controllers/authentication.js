/*globals CryptoJS*/
var app = angular.module('webapp.authentication', ['webapp.messages', 'ngCookies']);

app.factory('AuthenticationService', ['$http', '$cookies', function ($http, $cookies) {
  return {
    hash : function (words) {
      var hash = CryptoJS.algo.SHA512.create();
      var count = 0;
      if (words !== undefined && words.length !== 0) {
        for (count = 0;  count < words.length; count++) {
          var word = words[count];
          if (word !== undefined) {
            hash.update(word);
          }
        }
      } else {
        hash.update(this.generateKey());
      }
      return hash.finalize().toString();
    },

    generateKey : function () {
      return CryptoJS.lib.WordArray.random(128 / 8);
    },

    encrypt : function (input, secret) {
      return CryptoJS.AES.encrypt(input, secret);
    },

    decrypt : function (encrypted, secret) {
      return CryptoJS.AES.decrypt(encrypted, secret);
    }
  };
}]);

app.controller('CryptCtrl', ['$rootScope', '$scope', 'AuthenticationService', '$location', '$window', '$cookies', '$http', function ($rootScope, $scope, authenticationService, $location, $window, $cookies, $http) {

  $scope.login = function (username, password) {
    $http.post('/login', {
      user : username,
      data : authenticationService.encrypt(password, authenticationService.hash([username, $cookies['XSRF-TOKEN']])).toString()
    }).success(function (data, status, headers, config) {
      $scope.loggedIn = data.data;
    });
  };

  var userIsLoggedIn = function () {
    return $scope.logintext !== 'Login';
  };
  
  $scope.toggleLoginStatus = function () {
    if (userIsLoggedIn()) {
      $scope.logintext = 'Login';
    } else {
      $scope.logintext = 'Logout';
    }
  };

  var changeLocation = function (url, forceReload) {
    $scope = $scope || angular.element(document).scope();
    if (forceReload || $scope.$$phase) {
      $window.location = url;
    } else {
      $location.path(url);
      $scope.$apply();
    }
  };

  $rootScope.$on('$routeChangeSuccess', function (event, currRoute, prevRoute) {
    if (!prevRoute.access.isFree && !$scope.login) {
      changeLocation("/login", true);
    }
  });
}]);

app.directive('login', [function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    controller: 'CryptCtrl',
    templateUrl: '/app/partials/login-logout-status.html',
    link: function (scope, element, attrs) {
      scope.toggleLoginStatus();
      element.bind('click', function () {
        scope.$apply(scope.toggleLoginStatus);
      });
    }
  };
}]);