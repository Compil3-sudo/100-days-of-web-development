require("dotenv").config(); // Load environment variables from .env file

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  database: "blog",
  user: "root",
  password: process.env.PASSWORD,
});

module.exports = pool;
