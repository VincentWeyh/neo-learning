var db = require('../db.js');

module.exports = {
  getAllDocuments: function(cb) {
    db('Document').select('*').then(function(documents) {
      cb(null, documents);
    }).catch(function(err) {
      cb(err);
    });
  }
}
