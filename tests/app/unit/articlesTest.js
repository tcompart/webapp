/*globals it, describe, beforeEach, inject, expect */
'use strict';

describe('ArticlesCtrl', function () {
  var $scope, $rootScope, articleService, messageService, givenArticle;

  beforeEach(module('webapp.articles'));

  beforeEach(inject(function (_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    articleService = {
      getArticles : function (callback) {
        $scope.articles = [];
        $scope.currentArticle = null;
      }
    };
    messageService = {};

    _$controller_('ArticlesCtrl', {
      '$scope': $scope,
      'ArticleService': articleService,
      'Version' : '1',
      'MessageService': messageService
    });
    givenArticle = { title : "this is some article", content: "This is the content." };
  }));


  it('no edit during startup possible', inject(function () {
    expect($scope.underEdit).toEqual(false);
  }));

  it('should set version depending on injected version', inject(function () {
    expect($scope.contentVersion).toEqual('1');
  }));

  it('should have no articles per default', inject(function () {
    expect($scope.articles).toEqual([]);
  }));

  it('should be under edit on command called', inject(function () {
    $scope.showNewArticleDiv();
    expect($scope.underEdit).toEqual(true);
  }));

  it('should show article passed', inject(function () {
    $scope.showArticle(givenArticle);
    expect($scope.currentArticle).toEqual(givenArticle);
  }));

  it('should not show any article on start', inject(function () {
    expect($scope.showDeleteButton).toEqual(null);
  }));

  it('should hide delete action if command was called', inject(function () {
    $scope.showDeleteAction(givenArticle);
    expect($scope.showDeleteButton).toEqual(givenArticle);
    $scope.hideDeleteAction(givenArticle);
    expect($scope.showDeleteButton).toEqual(null);
  }));

//  it('should ....', inject(function() {
    //spec body
//  }));
});