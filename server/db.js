var knex = require('knex')({
  client: 'postgres',
  connection: {
    host : '127.0.0.1',
    user : 'apprenant',
    password : '0000',
    database : 'apprenant'
  }
});

module.exports = knex;
