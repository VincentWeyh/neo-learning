var db = require('../db.js');

module.exports = {
  getAllTests: function(cb) {
    db('Test').select('*').then(function(tests) {
      cb(null, tests);
    }).catch(function(err) {
      cb(err);
    });
  }
}
