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
  getUserById: function(criteria, cb) {

    db('User').select('*').where({idUser: criteria}).then(function(user) {
      
      cb(null, user[0]);
    }).catch(function(err) {
      console.log('USERBYID ERR : ', err);
      cb(err);
    });
  },
  getUser: function(criteria, cb) {
    db('User').select('*').where({email: criteria}).then(function(user) {
      if(!user || !user.length) {
        return cb('No user found');
      }
      cb(null, user[0]);
    }).catch(function(err) {
      cb(err);
    });
  },
  listUsersIn: function(criteria, cb) {
    db('User').select('*').whereIn('idUser', criteria).then(function(courses) {
      cb(null, courses);
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
    db('User').update({enabled: false}).where({idUser: criteria }).then(function(user) {
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
        criteria.updatedAt = new Date();
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
  },
}
