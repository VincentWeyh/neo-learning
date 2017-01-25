var db = require('../db.js');
var _ = require('lodash');

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
  },
  createUserCourses: function(criteria, cb) {
    db('UserCourse').insert(criteria).returning('idUserCourse').then(function(userCourse) {
      console.log('USERCOURSE : ', userCourse);
      if(!userCourse || !userCourse.length) {
        return cb('Insert user error');
      }
      cb(null, userCourse[0]);
    }).catch(function(err) {
      cb(err);
    });
  },
  disableUserCourses: function(criteria, cb){
    db('UserCourse').update({enabled: false}).whereIn('idUser', _.map(criteria, function(item) {
      return item.idUser;
    })).whereIn('idCourse', _.map(criteria, function(item) {
      return item.idCourse;
    })).then(function(userCourse) {
      if(!userCourse) {
        return cb('Insert userCourse error');
      }
      cb(null, userCourse);
    }).catch(function(err) {
      console.log('ERR; ', err);
      cb(err);
    });

  }
}
