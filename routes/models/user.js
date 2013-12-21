var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: String,
  date_of_birth: Date
});

UserSchema.virtual('date')
  .get(function () {
    return this._id.getTimestamp();
  });

mongoose.model('User', UserSchema);
