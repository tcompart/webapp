/*globals it, describe, afterEach, beforeEach, inject, expect */
describe('PasswordCtrl', function () {
  var passwordCtrl, scope, rootScope, http, httpBackend, cookie;

  beforeEach(function () {
    module('webapp.authentication');
  });

  beforeEach(inject(function ($rootScope, $controller, $httpBackend, $http, $cookies) {

    rootScope = $rootScope;
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    http = $http;
    cookie = $cookies;
    passwordCtrl = $controller('PasswordCtrl', {
      '$scope': scope,
      '$http' : http,
      '$cookies' : cookie
    });
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('should accept the common knowledge', function () {

    beforeEach(function () {
      httpBackend.when('GET', '/login').respond(function (method, url, data) {
        cookie.sessionToken = "onlyForCurrentUserSessionToken";
        return [204, ""];
      });
    });

    it('that knowledge has to be requested from server', inject(function () {
      httpBackend.expectGET('/login');
      httpBackend.flush();
    }));

    it('that knowledge has to be given by server', inject(function () {
      httpBackend.flush();
      expect(scope.secret.knowledge).toEqual('onlyForCurrentUserSessionToken');
    }));
  });
});