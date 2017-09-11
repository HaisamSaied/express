var mongoose = require('mongoose').set('debug', true);
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
  },
  username: String,
  password: {
      type: String,
      unique: true,
      required: true,
  }
});

//hash password before saving to database
// UserSchema.pre('save', function(next) {
//   var user = this;
//   bcrypt.hash(user.password, 10, function(err, hash) {
//     if(err) {
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   })
// });

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {
  newUser.save(callback);
}

module.exports.identifyUser = function(username, password, callback) {
  var err;
  var user;
  var hashedPassword = bcrypt.hash(password, 10, function(err, hash) {
    if(err) {
      return next(err);
    }
    return hash;
    next();
  })

  var query = { username: username };
  User.findOne({ username: 'haisam' }, function(error, user) {
    console.log("Users are: ", user);
    console.log("Error is: ", error);
    if(err) {
      err = "User not in database";
    } else {
      console.log(user);
      if(user.password !== hashedPassword) {
        error = "User password is not valid.";
      } else {
        error = null;
        // user = user;
      }
    }
  });
  callback(error, user);
}

module.exports.getUserByUsername = function(username, callback) {
  var query = { username: username };
  User.findOne(query, callback);
}
