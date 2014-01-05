module.exports = function (config) {
  config.set({
    basePath : './',
    files : [
      'public/js/angular.js',
      'public/js/angular-*.js',
      'tests/app/lib/angular-mocks.js',
      'public/app/**/*.js',
      'tests/app/unit/**/*.js'
    ],
    exclude : [
      'public/js/angular-loader.js',
      'public/js/*.min.js',
      'public/js/angular-scenario.js'
    ],
    autoWatch : true,
    frameworks: ['jasmine'],
    browsers : ['Chrome'],
    plugins : [
      'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ],
    junitReporter : {
      outputFile: 'tests/app/out/unit.xml',
      suite: 'unit'
    }
  });
};