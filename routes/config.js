var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'webapp'
    },
    port: 80,
    db: 'mongodb://rw-user:rw-user-password@paulo.mongohq.com:10091/webapp-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'webapp'
    },
    port: 3000,
    db: 'mongodb://localhost/webapp-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'webapp'
    },
    port: 3000,
    db: 'mongodb://localhost/webapp-production'
  }
};

module.exports = config[env];
