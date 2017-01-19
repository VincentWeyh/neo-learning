var express = require('express');
var router = express.Router();
var DB = require('./models.js')
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

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

exports.isAuthenticated = passport.authenticate('basic', { session : false });
