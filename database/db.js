var pg = require('pg');
var knex = require('./test/knex.js').config;

var client = new pg.Client(knex.connection);
console.log('database: ', knex.connection);

client.connect();

module.exports = client;