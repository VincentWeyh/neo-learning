module.exports = function(router, DB) {
  router.get('/user/:id/course', function(req, res, next) {
    DB.user.getUserById(req.params.id, function(err, user) {
      if(err) {
        res.json({
           success: false,
           message: 'User does not exist'
         });
         return next();
       }
      DB.userCourse.listUserCourses({idUser: req.params.id}, function(err, userCourses) {
        if(err) {
          res.json({
             success: false,
             message: 'Failed load users student courses'
           });
           return next();
        }
        DB.course.listCourses({idTeacher: req.params.id}, function(err, teacherCourses) {
          if(err) {
            res.json({
               success: false,
               message: 'Failed load users teacher courses'
             });
             return next();
          }
          var idsCourses = [];
          userCourses.forEach(function(course) {
            idsCourses.push(course.idCourse);
          });
          DB.course.listCoursesIn(idsCourses, function(err, studentCourses) {
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
    });
  });
}
