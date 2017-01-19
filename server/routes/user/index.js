var express = require('express');
var router = express.Router();
var DB = require('../../models.js')

router.get('/user/', function(req, res, next) {
  DB.user.listUsers(function(err, users) {
    if(err) {
      res.json({
         success: false,
         message: 'Failed load users'
       });
       return next();
    }
    res.json({
       success: true,
       data: users
     });
  });
});

router.get('/user/:id', function(req, res, next) {
  DB.user.getUser(req.params.id, function(err, user) {
    if(err) {
      res.json({
         success: false,
         message: 'Failed load user'
       });
       return next();
    }
    res.json({
       success: true,
       data: user
     });
  });
});



module.exports = router;
