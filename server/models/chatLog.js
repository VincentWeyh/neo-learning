var db = require('../db.js');

module.exports = {
  getAllLogs: function(cb) {
    db('ChatLog').select('*').then(function(logs) {
      cb(null, logs);
    }).catch(function(err) {
      cb(err);
    });
  }
}
