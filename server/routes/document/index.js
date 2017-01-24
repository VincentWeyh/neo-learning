var express = require('express');
var router = express.Router();
var DB = require('../../models.js');
var multer  = require('multer');
var Client = require('ftp');
var fs = require('fs');
var upload = multer({ dest: './' }).any();

router.post('/document', function(req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return
    }

    req.files.forEach(function(file) {
      var filePath = file.destination + file.path;
      var c = new Client();
      c.on('ready', function() {
        c.put(filePath, 'neo-learning/' + req.body.idCourse + '/' + file.filename, function(err) {
          if (err) throw err;
          c.end();
          var fileExt = file.originalname.split('.')[1];
          DB.document.createDocument({idUserCourse: req.body.idUserCourse, description: req.body.description, fileName: file.filename, originalName: file.originalname, url: 'neo-learning/' + req.body.idCourse + '/', ext: fileExt}, function(err, doc) {
            if(err) {
              console.log('ERROR CREATE DOC : ', err);
            }
            fs.unlink(filePath, function(err) {
              if(err) {
                throw err;
              }
              res.json({
                 success: true,
                 data: doc
               });
            });
          });
        });
      });
      // connect to localhost:21 as anonymous
      c.connect({
        host: '192.168.1.85',
        port: 21,
        user: 'test',
        password: 'test',
        secure: true,
        secureOptions: {rejectUnauthorized:false}
      });
    });
  });

});

router.get('/documents/:id', function(req, res, next) {
  DB.document.listDocumentsByCourse(req.params.id, function(err, documents) {
    if(err) {
      res.json({
         success: false,
         message: 'Failed load documents'
       });
       return next();
    }
    res.json({
       success: true,
       data: documents
     });
  });
});

router.get('/document/:id', function(req, res, next) {
  DB.document.downloadDocument(req.params.id, function(err, document) {
    if(err) {
      res.json({
         success: false,
         message: 'Failed load document'
       });
       return next();
    }
    console.log('FINAL DOC : ', document);
    res.json({
       success: true,
       data: document
     });
  });
});

module.exports = router;
