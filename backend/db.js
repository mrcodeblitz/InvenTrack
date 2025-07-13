const { Pool } = require('pg');

const pool = new Pool({
  user: '',       // replace with your PostgreSQL username
  host: 'localhost',           // or your PostgreSQL server address
  database: '',   // replace with your database name
  password: '',   // replace with your PostgreSQL password
  port: 5432                   // default PostgreSQL port
});

module.exports = pool;
