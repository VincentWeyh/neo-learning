module.exports = function(router, DB) {
  router.get('/course/:id/user', function(req, res, next) {
    DB.course.getCourse(req.params.id, function(err, course) {
      if(err) {
        res.json({
           success: false,
           message: 'Course does not exist'
         });
         return next();
       }
      DB.userCourse.listUserCourses({idCourse: req.params.id, enabled: true}, function(err, userCourses) {
        if(err) {
          res.json({
             success: false,
             message: 'Failed load users courses '
           });
           return next();
        }
        var idsCourses = [];
        userCourses.forEach(function(course) {
          idsCourses.push(course.idUser);
        });
        DB.user.getUserById(course.idTeacher, function(err, teacherCourses) {
          if(err) {
            res.json({
               success: false,
               message: 'Failed load Teacher'
             });
             return next();
            }
          DB.user.listUsersIn(idsCourses, function(err, studentCourses) {
            if(err) {
              res.json({
                 success: false,
                 message: 'Failed load users courses'
               });
               return next();
            }
            studentCourses.forEach(function(user) {
              delete user.password;
              delete user.salt;
              delete user.iteration;
            });
              delete teacherCourses.password;
              delete teacherCourses.salt;
              delete teacherCourses.iteration;
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
  }),

  router.post('/course/:id/user', function(req, res, next) {
    var criteria = [];
    if(req.body.idUsers && !req.body.idUsers.length) {
      res.json({
         success: true,
         data: []
       });
       return next();
    }
    req.body.idUsers.forEach(function(idUser) {
      criteria.push({idUser: idUser, idCourse: req.params.id});
    });
    DB.userCourse.createUserCourses(criteria, function(err, users) {
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
  }),
  router.delete('/course/:id/user', function(req, res, next) {
    var criteria = [];
    if(req.body.idUsers && !req.body.idUsers.length) {
      res.json({
         success: true,
         data: []
       });
       return next();
    }
    req.body.idUsers.forEach(function(idUser) {
      criteria.push({idUser: idUser, idCourse: req.params.id});
    });
    DB.userCourse.disableUserCourses(criteria, function(err, users) {
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

}
