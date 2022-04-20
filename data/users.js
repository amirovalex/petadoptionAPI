const { query } = require("../lib/db");
const { v4: uuidv4 } = require("uuid");
const instance = null;
const bcrypt = require("bcrypt");
const saltRounds = 10;
class userService {
  static getUserServiceInstance() {
    console.log("userService instance", instance);
    return instance ? instance : new userService();
  }

  getAllUsers = async () => {
    try {
      const sql = "SELECT * FROM users";
      const users = await query(sql);
      return users;
    } catch (err) {
      console.log(err);
    }
  };

  getUserByEmail = async (email) => {
    try {
      const sql = `SELECT * FROM users WHERE email='${email}'`;
      const rows = await query(sql);
      return rows[0];
    } catch (err) {
      console.log(err);
    }
  };

  getUserById = async (id) => {
    try {
      const sql = `SELECT * FROM users WHERE id = '${id}'`;
      const user = await query(sql);
      return user[0];
    } catch (err) {
      console.log(err);
    }
  };

  //CONTINUE HERE

  updateUser = async (
    id,
    hashPassword,
    email,
    firstName,
    lastName,
    phone,
    bio
  ) => {
    try {
      const sql =
        `UPDATE users SET ` +
        `${
          hashPassword
            ? `password = '${hashPassword}' ${
                email || firstName || lastName || phone || bio ? "," : ""
              }`
            : ""
        }` +
        `${
          email
            ? `email = '${email}' ${lastName || phone || bio ? "," : ""}`
            : ""
        }` +
        `${
          firstName
            ? `firstName = '${firstName}' ${
                lastName || phone || bio ? "," : ""
              }`
            : ""
        }` +
        `${
          lastName ? `lastName = '${lastName}' ${phone || bio ? "," : ""}` : ""
        }` +
        `${phone ? `phone = '${phone}' ${bio ? "," : ""}` : ""}` +
        `${bio ? `bio= '${bio}'` : ""}` +
        `WHERE id = ?`;
      const updatedUser = await query(sql, [id]);
      return updatedUser;
    } catch (err) {
      console.log(err);
    }
  };

  loginUser = async (email, password) => {
    try {
      const sql = `SELECT * FROM users WHERE email = '${email.toLowerCase()}'`;
      const user = await query(sql);
      const dbPass = user[0].password;
      const isPasswordValid = await bcrypt.compare(password, dbPass);
      console.log("user inside data login", user);
      if (isPasswordValid) return user;
      return "password not valid";
    } catch (err) {
      console.log(err);
    }
  };

  addUser = async (
    email,
    hashPassword,
    firstName,
    lastName,
    phone,
    createdDate,
    admin
  ) => {
    try {
      const userId = uuidv4();
      const sql = `INSERT INTO users(id,email,password,firstName,lastName,phone,createdDate,admin) VALUES (?,?,?,?,?,?,?,?);`;
      const addedUser = await query(sql, [
        userId,
        email.toLowerCase(),
        hashPassword,
        firstName,
        lastName,
        phone,
        createdDate,
        admin,
      ]);
      return { ...addedUser, id: userId };
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = userService;
