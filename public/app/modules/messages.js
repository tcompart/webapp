var app = angular.module('webapp.messages', []);

app.factory('MessageService', ['$rootScope', '$timeout', function ($scope, $timeout) {
  $scope.messages = [];
  $scope.state = 'state-success-bg';
  return {
    setStateOk : function () {
      $scope.state = "success";
    },
    setStateWarn : function () {
      $scope.state = "warning";
    },
    setStateError : function () {
      $scope.state = "error";
    },
    addMessage : function (messagetext) {
      $scope.messages.splice(0, 0, messagetext);
      $timeout(function () {
        $scope.messages.splice(0,1);
      }, 5000);
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

app.directive('messagebox', ['MessageService', function (messageService) {
  return {
    restrict : 'E',
    scope : {},
    controller : ['$scope', function (scope) {
      scope.messagebox = {
        messages : messageService.getMessages(),
        state : messageService.getState()
      };
    }],
    templateUrl : '/app/partials/message-box.html'
  };
}]);