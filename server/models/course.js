var db = require('../db.js');


module.exports = {
  getAllCourses: function(cb) {
    db('Course').select('*').then(function(courses) {
      cb(null, courses);
    }).catch(function(err) {
      cb(err);
    });
  },
  listCourses: function(criteria, cb) {
    db('Course').select('*').where(criteria).then(function(courses) {
      cb(null, courses);
    }).catch(function(err) {
      cb(err);
    });
  },
  listCoursesIn: function(criteria, cb) {
    db('Course').select('*').whereIn('idCourse', criteria).then(function(courses) {
      cb(null, courses);
    }).catch(function(err) {
      cb(err);
    });
  },
  getCourse: function(criteria, cb) {
    db('Course').select('*').where({idCourse: criteria}).then(function(courses) {
      if(!courses || !courses.length) {
        return cb('No courses found');
      }
      cb(null, courses[0]);
    }).catch(function(err) {
      cb(err);
    });
  },
  createCourse: function(criteria, cb) {
    db('Course').insert(criteria).returning('idCourse').then(function(course) {
      if(!course || !course.length) {
        return cb('Insert course error');
      }
      cb(null, course[0]);
    }).catch(function(err) {
      cb(err);
    });
  },
  updateCourse: function(criteriaId, criteria,  cb) {
    criteria.updatedAt = new Date();
    db('Course').update(criteria).where({idCourse: criteriaId }).then(function(user) {
      if(!user) {
        return cb('Update failed');
      }
      cb(null);
    }).catch(function(err) {
      cb(err);
    });
  },
  deleteCourse: function(criteria, cb) {
    db('Course').update({enabled: false}).where({idCourse: criteria }).then(function(course) {
      if(!course) {
        return cb('Delete course failed');
      }
      cb(null);
    }).catch(function(err) {
      cb(err);
    });
  },
}
