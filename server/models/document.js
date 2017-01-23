var db = require('../db.js');


module.exports = {
  getAllDocuments: function(cb) {
    db('Document').select('*').then(function(documents) {
      cb(null, documents);
    }).catch(function(err) {
      cb(err);
    });
  },
  deleteDocument: function(criteria, cb) {
    db('Document').delete().where({idDocument: criteria }).then(function(document) {
      if(!document) {
        return cb('Delete failed');
      }
      cb(null);
    }).catch(function(err) {
      cb(err);
    });
  },
  createDocument: function(criteria, cb) {
    db('Document').insert(criteria).returning('idDocument').then(function(document) {
      if(!document || !document.length) {
        return cb('Insert document error');
      }
      cb(null, document[0]);
    }).catch(function(err) {
      cb(err);
    });
  },
}
