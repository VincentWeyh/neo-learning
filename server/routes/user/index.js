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

/* POST /users */
router.post('/user', function(req, res, next) {
  console.log("Create User : " , req.body);
  if (!req.body.email || !req.body.password ) {
    res.json({
       success: false,
       message: 'Missing Email or Password'
     });
    return next();
  }
  DB.user.createUser(req.body, function (err, user) {
    if(err) {
      console.log("Error User : " , err);
      res.json({
         success: false,
         message: err
       });
       return next();
    }
    res.json({
       success: true,
       data: user
     });
    return next();
  });
});

router.delete('/user/:id', function(req, res, next) {
  DB.user.deleteUser(req.params.id, function(err) {
    if(err) {
      res.json({
         success: false,
         message: err
       });
       return next();
    }
    res.json({
       success: true
     });
  });
});



module.exports = router;
