var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var userSchema = mongoose.Schema({
  username: { type: String, index: { unique: true } },
  password: { type: String }  
});


userSchema.methods.comparePassword = function(storedPassword, attemptedPassword, callback) {
  bcrypt.compare(storedPassword, attemptedPassword, function(err, isMatch) {
    console.log('compare method', storedPassword.length, attemptedPassword.length);
    // if (err) {
    //   callback(err);
    if (storedPassword === attemptedPassword) {
      console.log(isMatch);
      callback('bull', isMatch);
    }
  });
};


userSchema.methods.hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
};


// userSchema.pre('save', function(next) {
//   var cipher = Promise.promisify(bcrypt.hash);
//   return cipher(this.password, null, null).bind(this)
//     .then(function(hash) {
//       this.password = hash;
//     });
// });

var User = mongoose.model('User', userSchema);
module.exports = User;
