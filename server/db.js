var knex = require('knex')({
  client: 'postgres',
  connection: {
    host : global.dbUrl,
    user : 'apprenant',
    password : '0000',
    database : 'apprenant'
  }
});

module.exports = knex;
