var express = require('express');
var router = express.Router();
var DB = require('./models.js')
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var crypto = require('crypto');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
   DB.user.select({id: jwt_payload.id}, function(err, user) {
       if (err) {
           return done(err, false);
       }
       if (user && user.length) {
           user = user[0];
           done(null, user);
       } else {
           done(null, false);
       }
   });
}));

module.exports = {
  hashPassword: function(password, cb) {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    crypto.pbkdf2(password, salt, iterations, 512, 'sha512', function(err, hash) {
      if(err) {
        return cb(err);
      }
      hash = hash.toString('hex');
      cb(null, {
          salt: salt,
          hash: hash,
          iterations: iterations
      });
    });
  },

  comparePassword: function(passwordAttempt, savedHash, savedSalt, savedIterations, cb) {
    crypto.pbkdf2(passwordAttempt, savedSalt, savedIterations, 512, 'sha512', function(err, hash) {
      if(err) {
        return cb(err);
      }
      hash = hash.toString('hex');
      cb(null, savedHash == hash);
    });
  },

  isAuthenticated: passport.authenticate('basic', { session : false })
}
