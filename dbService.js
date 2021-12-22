const mysql = require("mysql");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");
const { query } = require("./lib/db");

let instance = null;
dotenv.config();

// class DbService {
//   static getDbServiceInstance() {
//     console.log("instance", instance);
//     return instance ? instance : new DbService();
//   }
// // }

// module.exports = DbService;
