var app = angular.module('webapp.messages', []);

app.factory('MessageService', ['$scope', function ($scope) {
  return {
    setStateOk : function () {
      $scope.state = "OK";
    },
    setStateWarn : function () {
      $scope.state = "WARN";
    },
    setStateError : function () {
      $scope.state = "ERROR";
    },
    addMessage : function (messagetext) {
      $scope.messages = [].push.apply($scope.messages, [ messagetext ]);
    },
    getMessages : function () {
      return $scope.messages;
    },
    getState : function () {
      return $scope.state;
    },
    clearMesages : function () {
      $scope.state = undefined;
      $scope.messages = [];
    }
  };
}]);

app.directive('messagebox', function () {
  return {
    restrict : 'E',
    scope : { messagebox : {}},
    controller : [ '$scope', 'MessageService', function ($scope, messageService) {
      $scope.messagebox = {
        messages : [],
        state : ''
      };
    }],
    templateUrl : '/app/partials/message-box.html'
  };
});