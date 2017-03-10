var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

// TESTING

var linkSchema = mongoose.Schema({
  visits: Number,
  // link: String,
  title: String,
  code: String,
  baseUrl: String,
  url: String
});


var createSha = function(url) {
  var shasum = crypto.createHash('sha1').update(url).digest('hex').slice(0, 5);
  return shasum;
};

linkSchema.pre('save', function(next) {
  var shorty = createSha(this.url);
  this.code = shorty;
  console.log(this.code);
  next();


  // var shasum = crypto.createHash('sha1');
  // shasum.update(this.url);
  // this.code = shasum.digest('hex').slice(0, 5);
  // next();
});

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;
