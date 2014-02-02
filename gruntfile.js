/*global module:false*/
'use strict';

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    jshint: {
      src: ['gruntfile.js', 'app/**/*.js', 'routes/**/*.js', 'server/**/*.js', 'tests/app/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          app: true,
          require: true,
          define: true,
          requirejs: true,
          describe: true,
          expect: true,
          it: true,
          exports: true,
          module: true
        }
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    express: {
      options: {
        script: 'server/server.js',
        background: false,
        debug: true,
        output: ".+"
      },
      dev: {
        options: {
          node_env: 'development'
        }
      },
      prod: {
        options: {
          node_env: 'production'
        }
      },
      test: {
        options: {
          node_env: 'test'
        }
      }
    },
    watch: {
      express: {
        files:  [ 'public/**/*.js', 'server/**', 'routes/**' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('server', ['express:dev', 'watch']);
};
