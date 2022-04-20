const mysql = require("mysql");
const path = require("path");
const Postgrator = require("postgrator");
require("dotenv").config();

const postgrator = new Postgrator({
  migrationDirectory: path.resolve(__dirname, "../migrations"),
  driver: "mysql",
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  schemaTable: "migrations",
});

exports.postgrator = postgrator;

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

exports.pool = pool;

function query(sql, arr) {
  return new Promise((resolve, reject) => {
    pool.query(sql, arr, (err, result) => {
      console.log("err ", err, " result ", result);
      if (err) reject(err);
      else resolve(result);
    });
  });
}

exports.query = query;
