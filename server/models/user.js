var db = require('../db.js');

module.exports = {
  listUsers: function(cb) {
    db('User').select('*').then(function(users) {
      cb(null, users);
    }).catch(function(err) {
      cb(err);
    });
  },
  getUser: function(criteria, cb) {
    db('User').select('*').where(criteria).then(function(users) {
      if(!users || !users.length) {
        return cb('No user found');
      }
      cb(null, users[0]);
    }).catch(function(err) {
      cb(err);
    });
  }
}
