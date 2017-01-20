var express = require('express');
var router = express.Router();
var DB = require('../../models.js');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

function hashPassword(password, cb) {
  var salt = crypto.randomBytes(128).toString('base64');
  var iterations = 10000;
  crypto.pbkdf2(password, salt, iterations, 512, 'sha512', function(err, hash) {
    if(err) {
      return cb(err);
    }
    cb(null, {
        salt: salt,
        hash: hash,
        iterations: iterations
    });
  });
}

function comparePassword(passwordAttempt, savedHash, savedSalt, savedIterations, cb) {
  crypto.pbkdf2(passwordAttempt, savedSalt, savedIterations, 512, 'sha512', function(err, hash) {
    if(err) {
      return cb(err);
    }
    hash = hash.toString('hex');
    cb(null, savedHash == hash);
  });
}

router.post('/auth', function(req, res, next) {
  if(!req.body || !req.body.email || !req.body.password) {
    res.json({
       success: false,
       message: 'Missing email or password1'
     });
     return next();
  }

  DB.user.getUser({email: req.body.email}, function(err, user) {
    if(err) {
      console.log(err);
      res.json({
         success: false,
         message: 'Invalid email or password2'
       });
       return next();
    }
    comparePassword(req.body.password, user.password, user.salt, user.iteration, function(err, isValid) {
      if(isValid) {
        delete user.password;
        delete user.salt;
        delete user.iteration;
        var token = jwt.sign(user, 'secret');
        res.json({
         success: true,
         data: token
        });
      } else {
        res.json({
           success: false,
           message: 'Invalid email or password3'
         });
      }
    });
  });
});



module.exports = router;
