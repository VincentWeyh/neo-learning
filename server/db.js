var knex = require('knex')({
  client: 'postgres',
  connection: {
    host : 'db',
    user : 'apprenant',
    password : '0000',
    database : 'apprenant'
  }
});

module.exports = knex;
