module.exports = function (config) {
  config.set({
    basePath : './',
    files : [
      'public/js/jquery.js',
      'public/js/angular.js',
      'public/js/angular-*.js',
      'public/js/sha512.js',
      'public/js/aes.js',
      'tests/app/lib/angular-mocks.js',
      'public/app/**/*.js',
      'tests/app/unit/**/*.js',
      //location of templates
      'public/app/partials/**/*.html'
    ],
    exclude : [
      'public/js/angular-loader.js',
      'public/js/*.min.js',
      'public/js/angular-scenario.js',
      'public/js/angular-mocks.js'
    ],
    preprocessors : {
      'public/app/partials/**/*.html': ['ng-html2js']
    },
    ngHtml2JsPreprocessor: {
      moduleName: 'templates'
    },
    autoWatch : true,
    frameworks: ['jasmine'],
    browsers : ['Chrome'],
    plugins : [
      'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],
    junitReporter : {
      outputFile: 'tests/app/out/unit.xml',
      suite: 'unit'
    }
  });
};