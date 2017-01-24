
var express = require('express');
var router = express.Router();
var DB = require('../../models.js');


router.get('/role', function(req, res, next) {
  DB.role.getAllRoles(function(err, roles) {
    if(err) {
      res.json({
         success: false,
         message: 'Failed load roles'
       });
       return next();
    }
    res.json({
       success: true,
       data: roles
     });
  });
});



module.exports = router;
