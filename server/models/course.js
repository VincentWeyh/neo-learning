var db = require('../db.js');

module.exports = {
  listCourses: function(cb) {
    db('Course').select('*').then(function(courses) {
      cb(null, courses);
    }).catch(function(err) {
      cb(err);
    });
  }
}
