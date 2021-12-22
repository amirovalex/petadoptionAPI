const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db " + connection.state);
});

function query(sql, arr) {
  console.log("sql", sql);
  return new Promise((resolve, reject) => {
    connection.query(sql, arr, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

exports.query = query;
