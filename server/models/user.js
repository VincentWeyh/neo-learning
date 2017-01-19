var db = require('../db.js');
var auth = require('../auth.js');

module.exports = {
  getAllUsers: function(cb) {
    db('User').select('*').where({enabled: true}).then(function(users) {
      cb(null, users);
    }).catch(function(err) {
      cb(err);
    });
  },
  listUsers: function(criteria, cb) {
    criteria.enabled = true;
    db('User').select('*').where(criteria).then(function(users) {
      cb(null, users);
    }).catch(function(err) {
      cb(err);
    });
  },
  getUser: function(criteria, cb) {
    db('User').select('*').where( {idUser: criteria}).then(function(users) {
      if(!users || !users.length) {
        return cb('No user found');
      }
      delete users[0].password;
      delete users[0].salt;
      delete users[0].iteration;
      cb(null, users[0]);
    }).catch(function(err) {
      cb(err);
    });
  },
  createUser: function(criteria, cb) {
    auth.hashPassword(criteria.password, function(err, password) {
      if(err) {
        return cb(err);
      }
      criteria.password = password.hash;
      criteria.salt = password.salt;
      criteria.iteration = password.iterations;
      db('User').select('idUser').where({email: criteria.email, enabled: true}).then(function(users) {
        if(!users || users.length) {
          return cb('Email already in use');
        }
        db('User').insert(criteria).returning('idUser').then(function(user) {
          if(!user || !user.length) {
            return cb('Insert user error');
          }
          cb(null, user[0]);
        }).catch(function(err) {
          cb(err);
        });
      }).catch(function(err) {
        cb(err);
      });
    })
  },
  deleteUser: function(criteria, cb) {
    console.log("criteria : " , criteria)
    db('User').update({enabled: false}).where({idUser: criteria }).then(function(user) {
      console.log("Delete : " , user)
      if(!user) {
        return cb('Delete failed');
      }
      cb(null);
    }).catch(function(err) {
      cb(err);
    });
  },
  updateUser: function(criteriaId, criteria,  cb) {
    delete criteria.salt;
    delete criteria.iteration;
    if(criteria.password) {
      auth.hashPassword(criteria.password, function(err, password) {
        if(err) {
          return cb(err);
        }
        criteria.password = password.hash;
        criteria.salt = password.salt;
        criteria.iteration = password.iterations;
        db('User').update(criteria).where({idUser: criteriaId }).then(function(user) {
          if(!user) {
            return cb('Update failed');
          }
          cb(null);
        }).catch(function(err) {
          cb(err);
        });
      });
    } else {
      db('User').update(criteria).where({idUser: criteriaId }).then(function(user) {
        if(!user) {
          return cb('Update failed');
        }
        cb(null);
      }).catch(function(err) {
        cb(err);
      });
    }
  }
}
