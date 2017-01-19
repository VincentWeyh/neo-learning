var express = require('express');
var router = express.Router();
var DB = require('../../models.js')

router.get('/course', function(req, res, next) {
  DB.course.getAllCourses(function(err, courses) {
    if(err) {
      res.json({
         success: false,
         message: 'Failed load courses'
       });
       return next();
    }
    res.json({
       success: true,
       data: courses
     });
  });
});

router.get('/course/:id', function(req, res, next) {
  DB.course.getCourse(req.params.id, function(err, course) {
    if(err) {
      res.json({
         success: false,
         message: 'Failed load course'
       });
       return next();
    }
    res.json({
       success: true,
       data: course
     });
  });
});

router.post('/course', function(req, res, next) {
  if (!req.body.label ) {
    res.json({
       success: false,
       message: 'Missing Label Course'
     });
    return next();
  }
  DB.course.createCourse(req.body, function (err, course) {
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
       data: course
     });
    return next();
  });
});


module.exports = router;
