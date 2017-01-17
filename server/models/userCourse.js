var db = require('../db.js');

module.exports = {
  listUserCourse: function(cb) {
    db('UserCourse').select('*').then(function(userCourses) {
      cb(null, userCourses);
    }).catch(function(err) {
      cb(err);
    });
  }
}
