/*https://github.com/iameugenejo/angular-centered/angular-centered.js*/
var app = angular.module('webapp.styling', []);

app.controller('OverlayCtrl', ["$scope", function ($scope) {
  $scope.displayBlock = { "display": "block" };
  $scope.displayNone = { "display": "none" };
  $scope.overlayClass = "white_content";
  $scope.lightStyle = $scope.displayNone;
  $scope.fadeStyle = $scope.displayNone;

  $scope.closeOverlay = function () {
    $scope.lightStyle = $scope.displayNone;
    $scope.fadeStyle = $scope.displayNone;
  };

  $scope.openOverlay = function () {
    $scope.lightStyle = $scope.displayBlock;
    $scope.fadeStyle = $scope.displayBlock;
  };

  $scope.$on('openOverlay', $scope.openOverlay);
}]);

app.directive("overlay", function () {
  return {
    restrict: "ECA",
    scope: {},
    controller: 'OverlayCtrl',
    transclude: true,
    templateUrl: '/app/partials/login/overlay.html'
  };
});

app.directive("centered", function () {
  return {
    restrict: "ECA",
    transclude: true,
    templateUrl: '/app/partials/login/centered.html'
  };
});
