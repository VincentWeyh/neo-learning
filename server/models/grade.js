var db = require('../db.js');

module.exports = {
  getAllGrades: function(cb) {
    db('Grade').select('*').then(function(grades) {
      cb(null, grades);
    }).catch(function(err) {
      cb(err);
    });
  }
}
