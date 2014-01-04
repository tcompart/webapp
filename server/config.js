var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

process.env.NODE_ENV = env;

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'webapp'
    },
    port: 8000,
    secure_port: 8001,
    db: 'mongodb://rw-user:rw-user-password@paulo.mongohq.com:10091/webapp-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'webapp'
    },
    port: 3000,
    secure_port: 3001,
    db: 'mongodb://localhost/webapp-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'webapp'
    },
    port: 80,
    secure_port: 443,
    db: 'mongodb://rw-user:rw-user-password@linus.mongohq.com:10058/webapp-production'
  }
};

module.exports = config[env];
