var db = require('../db.js');
var _ = require('lodash');

module.exports = {
  getUserCourseId: function(criteria, cb) {
    db('UserCourse').select('idUserCourse').where({'idUser': criteria.idUser, 'idCourse': criteria.idCourse}).then(function(userCourses) {
      cb(null, userCourses);
    }).catch(function(err) {
      cb(err);
    });
  }

}
