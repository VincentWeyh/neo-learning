var express = require('express');
var router = express.Router();
var DB = require('../../models.js');


// retourne idUserCourse pour ce user et ce cours
router.get('/userCourse/:idUser/:idCourse', function(req, res, next) {
  DB.userCourse.getUserCourseId(req.params, function(err, userCourse) {
    if(err) {
      res.json({
         success: false,
         message: 'Failed userCourse'
       });
       return next();
    }
    res.json({
       success: true,
       data: userCourse
     });
  });
});







module.exports = router;
