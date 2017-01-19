// var express = require('express');
// var router = express.Router();
// var DB = require('../../models.js');

module.exports = function(router, DB) {
  router.get('/user/:id/course', function(req, res, next) {
    DB.userCourse.listUserCourses({idUser: req.params.id}, function(err, userCourses) {
      if(err) {
        res.json({
           success: false,
           message: 'Failed load users courses'
         });
         return next();
      }
      DB.course.listCourses({idTeacher: req.params.id}, function(err, teacherCourses) {
        if(err) {
          res.json({
             success: false,
             message: 'Failed load users courses'
           });
           return next();
        }
        var idsCourses = [];
        userCourses.forEach(function(course) {
          idsCourses.push(course.idCourse);
        });
        DB.course.listCourses({idCourse: idsCourses}, function(err, studentCourses) {
          if(err) {
            res.json({
               success: false,
               message: 'Failed load users courses'
             });
             return next();
          }
          res.json({
             success: true,
             data: {
               studentCourses: studentCourses,
               teacherCourses: teacherCourses
             }
           });
      });
    });
  });
}
