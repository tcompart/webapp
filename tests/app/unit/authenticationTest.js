/*globals it, describe, afterEach, beforeEach, inject, expect, CryptoJS */
describe('authenticationModule', function () {

  beforeEach(function () {
    module('webapp.authentication');
  });

  beforeEach(function () {
    this.addMatchers({});
  });

  describe('CryptographiController', function () {
    var cryptographicCtrl, scope, rootScope, http, httpBackend, cookie;

    beforeEach(inject(function ($rootScope, $controller, $httpBackend, AuthenticationService, $http, $cookies) {

      rootScope = $rootScope;
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      http = $http;
      cookie = $cookies;
      cryptographicCtrl = $controller('CryptCtrl', {
        '$rootScope' : rootScope,
        '$scope': scope,
        'authenticationService' : AuthenticationService,
        '$location' : null,
        '$window' : null,
        '$cookies' : cookie
      });
    }));

    afterEach(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('has to be defined', function () {
      expect(cryptographicCtrl).toBeDefined();
    });

    it('should be able to initialize a user submission', inject(function () {
      cookie['XSRF-TOKEN'] = 'abcdef';
      httpBackend.expectPOST("/login").respond(function (method, url, data, headers) {
        return [200, { data : "possibleAnswer"}];
      });
      scope.login("username", "password");
      httpBackend.flush();
      expect(scope.loggedIn).toEqual("possibleAnswer");
    }));
  });

  describe('AuthenticationService', function () {

    var authenticationService, httpBackend, http, cookie;

    beforeEach(inject(function (AuthenticationService, $httpBackend, $http, $cookies) {
      authenticationService = AuthenticationService;
      httpBackend = $httpBackend;
      http = $http;
      cookie = $cookies;
      cookie.sessionToken = "onlyForCurrentUserSessionToken";
    }));

    it('has to be defined', inject(function (AuthenticationService) {
      expect(AuthenticationService).toBeDefined();
    }));

    it('has to generate a random key', inject(function (AuthenticationService) {
      var generatedKey = AuthenticationService.generateKey();
      expect(generatedKey).toBeDefined();
      expect(generatedKey).not.toEqual(AuthenticationService.generateKey());
    }));

    it('has to encrypt input', inject(function (AuthenticationService) {
      var encrypted = AuthenticationService.encrypt("data", "mySecret");
      expect(encrypted).toBeDefined();
    }));

    it('encrypted string is never the same', inject(function (AuthenticationService) {
      var encrypted = AuthenticationService.encrypt("data", "mySecret");
      expect(encrypted.toString()).not.toEqual(AuthenticationService.encrypt("data", "mySecret").toString());
    }));

    it('has to encrypt and decrypt message input with same key', inject(function (AuthenticationService) {
      var encrypted = AuthenticationService.encrypt("data", "mySecret");
      var decrypted = AuthenticationService.decrypt(encrypted.toString(), "mySecret");
      expect(decrypted.toString(CryptoJS.enc.Utf8)).toEqual('data');
    }));

    it('cannot encrypt and decrypt with different keys', inject(function (AuthenticationService) {
      var encrypted = AuthenticationService.encrypt("data", "mySecret");
      var decrypted = AuthenticationService.decrypt(encrypted.toString(), "wrongKey");
      expect(decrypted.toString(CryptoJS.enc.Utf8)).toEqual('');
    }));

    it('should create a hash from only one given word', inject(function (AuthenticationService) {
      expect(AuthenticationService.hash(["word1"])).toBeDefined();
    }));

    it('should create a hash from two different words', inject(function (AuthenticationService) {
      var hash = AuthenticationService.hash(["word1", "word2"]);
      expect(hash).toBeDefined();
    }));

    it('should create a random hash if no parameters will be given', inject(function (AuthenticationService) {
      var hash = AuthenticationService.hash();
      expect(hash).toBeDefined();
      expect(hash).not.toEqual(AuthenticationService.hash());
    }));

    it('should create the same hash for the same given words', inject(function (AuthenticationService) {
      var hash = AuthenticationService.hash(['word1', 'word2', 'word3']);
      expect(hash).toEqual(AuthenticationService.hash(['word1', 'word2', 'word3']));
    }));
  });
});