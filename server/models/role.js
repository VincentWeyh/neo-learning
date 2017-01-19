var db = require('../db.js');

module.exports = {
  listRoles: function(cb) {
    db('Role').select('*').then(function(roles) {
      cb(null, roles);
    }).catch(function(err) {
      cb(err);
    });
  }
}
