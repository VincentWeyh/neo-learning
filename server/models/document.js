var db = require('../db.js');
var Client = require('ftp');
var fs = require('fs');
var cycle = require('cycle');


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
  listDocumentsByCourse: function(criteria, cb) {
    db('Document').select('*').leftJoin('UserCourse', 'Document.idUserCourse', '=', 'UserCourse.idUserCourse').where('UserCourse.idCourse', '=', criteria).then(function(documents) {
      cb(null, documents);
    }).catch(function(err) {
      console.log('DOCUMENTS ERR : ', err);

      cb(err);
    });
  },
  getDocument: function(criteria, cb) {
    db('Document').select('*').where({idDocument: criteria }).then(function(documents) {
      cb(null, documents);
    }).catch(function(err) {
      console.log('DOCUMENTS ERR : ', err);

      cb(err);
    });
  },

  downloadDocument: function(criteria, cb) {
    db('Document').select('*').where({idDocument: criteria }).then(function(document) {
      console.log('document', document[0] );
      var c = new Client();
      c.on('ready', function() {
        console.log('RADY', document[0].url  ,  document[0].fileName );
        c.get(document[0].url + document[0].fileName, function(err, file) {
          if (err) console.log('err' , err);
          file.once('close', function () {
            c.end();
          });
          cb(null, file);
        });
      });
      console.log('CONNECT');
      c.connect({
        host: '192.168.1.85',
        port: 21,
        user: 'test',
        password: 'test',
        secure: true,
        secureOptions: {rejectUnauthorized:false}
      });
    }).catch(function(err) {
      console.log('DOCUMENTS ERR : ', err);
      cb(err);
    });
  }
}
