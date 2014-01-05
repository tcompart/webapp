/*globals it, describe, beforeEach, inject, expect */
'use strict';

describe('ContentController', function () {
  var $scope, $rootScope, createController, articleService, messageService;

  beforeEach(module('webapp.articles'));

  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    articleService = {
      getArticles : function (callback) {}
    };
    messageService = {};

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('ContentCtrl', {
        '$scope': $scope,
        'ArticleService': articleService,
        'Version' : '1',
        'MessageService': messageService
      });
    };
  }));


  it('no edit during startup possible', inject(function () {
    var controller = createController();
    expect($scope.underEdit).toEqual(false);
  }));

  it('should set version depending on injected version', inject(function () {
    var controller = createController();
    expect($scope.contentVersion).toEqual('1');
  }));

//  it('should ....', inject(function() {
    //spec body
//  }));
});