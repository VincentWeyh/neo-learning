var db = require('../db.js');

module.exports = {
  getAllUserCourses: function(cb) {
    db('UserCourse').select('*').then(function(userCourses) {
      cb(null, userCourses);
    }).catch(function(err) {
      cb(err);
    });
  },
  listUserCourses: function(criteria, cb) {
    db('UserCourse').select('*').where(criteria).then(function(userCourses) {
      cb(null, userCourses);
    }).catch(function(err) {
      cb(err);
    });
  }
}
