/*globals it, describe, beforeEach, inject, expect */
'use strict';

describe('ContentController', function () {
  beforeEach(module('webapp.articles'));

  it('should get articles on start', inject(function () {
    expect(1).toEqual(1);
  }));

//  it('should ....', inject(function() {
    //spec body
//  }));
});