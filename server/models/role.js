var db = require('../db.js');

module.exports = {
  listGrade: function(cb) {
    db('Grade').select('*').then(function(grades) {
      cb(null, grades);
    }).catch(function(err) {
      cb(err);
    });
  }
}
