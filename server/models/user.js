var db = require('../db.js');

module.exports = {
  listUsers: function(cb) {
    db('User').select('iduser', 'userfirstname', 'userlastname', 'useremail').then(function(users) {
      cb(null, users);
    }).catch(function(err) {
      cb(err);
    });
  }
}
