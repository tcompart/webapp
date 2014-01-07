var app = angular.module('webapp.authentication', ['webapp.messages', 'ngCookies']);

app.controller('PasswordCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {

  $http.get('/login').success(function (data, status, header) {
    console.log("The following content of cookie: ", $cookies);
    $scope.secret = {
      knowledge : $cookies.sessionToken
    };
  });


}]);