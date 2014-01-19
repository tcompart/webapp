var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var User;

module.exports.init = function () {
  var UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    date_of_birth: Date,
    created_at: { type: Date },
    updated_at: { type: Date }
  });

  UserSchema.virtual('date').get(function () {
    return this._id.getTimestamp();
  });

  UserSchema.pre('save', function (next) {
    this.updated_at = new Date();
    if (!this.created_at) {
      this.created_at = new Date();
    }
  });

  User = mongoose.model('User', UserSchema);
};

module.exports.getUser = function (req, res, data) {
  function isValid(user) {
    return (user && user.user && user.data);
  }
  if (isValid(req.body.user)) {
    User.findOne({'name': req.username}, {'_id': 0, 'name': 1, 'email': 1, 'password': 0}, function (err, user) {
      if (err) {
        console.log(err);
        res.writeHead(500, "Internal server error");
      } else {
        res.json(user, 200);
      }
      res.end();
    });
  } else {
    console.log("invalid request found for req: ", req.body.user);
    res.writeHead(400, 'Bad request');
    res.end();
  }
};