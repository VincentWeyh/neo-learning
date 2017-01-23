var express = require('express');
var router = express.Router();
var DB = require('../../models.js');
var auth = require('../../auth.js');
var jwt = require('jsonwebtoken');

router.post('/auth', function(req, res, next) {
  if(!req.body || !req.body.email || !req.body.password) {
    res.json({
       success: false,
       message: 'Missing email or password1'
     });
     return next();
  }

  DB.user.getUser(req.body.email, function(err, user) {
    if(err) {
      console.log(err);
      res.json({
         success: false,
         message: 'Invalid email or password2'
       });
       return next();
    }
    auth.comparePassword(req.body.password, user.password, user.salt, user.iteration, function(err, isValid) {
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
