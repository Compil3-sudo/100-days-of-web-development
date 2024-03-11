const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  database: "security",
  user: "root",
  password: process.env.DB_PASSWORD,

  // multipleStatements: true,
  // be VERY CAREFUL WHEN USING THIS
  // multipleSatements should be false => this can lead to SQL INJECTION
});

module.exports = pool;
