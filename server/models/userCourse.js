var db = require('../db.js');
var _ = require('lodash');

module.exports = {
  getUserCourseId: function(criteria, cb) {
    db('UserCourse').select('idUserCourse').where({'idUser': criteria.idUser, 'idCourse': criteria.idCourse}).then(function(userCourses) {
      cb(null, userCourses);
    }).catch(function(err) {
      cb(err);
    });
  },

  listUserCourses: function(criteria, cb) {
    console.log('criteria A MERE', criteria)
    db('UserCourse').select('*').where({'idUser':criteria.idUser}).then(function(userCourses) {

      cb(null, userCourses);
    }).catch(function(err) {
      cb(err);
    });
  }

}
