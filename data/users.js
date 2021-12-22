const { query } = require("../lib/db");
const { v4: uuidv4 } = require("uuid");
const instance = null;

class userService {
  static getUserServiceInstance() {
    console.log("userService instance", instance);
    return instance ? instance : new userService();
  }

  getAllUsers = async () => {
    try {
      const sql = "SELECT * FROM users";
      const users = await query(sql);
      console.log("console", users, "console");
      return users;
    } catch (err) {
      console.log(err);
    }
  };

  getUserById = async (id) => {
    try {
      const sql = `SELECT * FROM users WHERE id = '${id}'`;
      console.log("my query", sql);
      const user = await query(sql);
      console.log("console", user, "console");
      return user[0];
    } catch (err) {
      console.log(err);
    }
  };

  //CONTINUE HERE

  updateUser = async (id, password, email, firstName, lastName, phone, bio) => {
    try {
      const bcryptPassword = await bcrypt.hash(password, saltRounds);
      const updateId = await new Promise((res, rej) => {
        const query =
          `UPDATE users SET ` +
          `${
            password
              ? `password = '${bcryptPassword}' ${
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
            lastName
              ? `lastName = '${lastName}' ${phone || bio ? "," : ""}`
              : ""
          }` +
          `${phone ? `phone = '${phone}' ${bio ? "," : ""}` : ""}` +
          `${bio ? `bio= '${bio}'` : ""}` +
          `WHERE id = ?`;
        connection.query(query, [id], (err, result) => {
          if (err) {
            console.log(err);
            rej(new Error(err.message));
          }
          res(result);
        });
      });
      console.log("console", updateId, "console");
      return updateId;
    } catch (err) {
      console.log(err);
    }
  };

  loginUser = async (email, password) => {
    try {
      const bcryptPassword = await bcrypt.hash("thetoken", saltRounds);
      console.log("toke", bcryptPassword);
      const sql = `SELECT * FROM users WHERE email = '${email.toLowerCase()}'`;
      const user = await query(sql);
      const dbPass = user[0].password;
      const isPasswordValid = await bcrypt.compare(password, dbPass);

      if (isPasswordValid) return user;
      return "password not valid";
    } catch (err) {
      console.log(err);
    }
  };

  addUser = async (email, password, firstName, lastName, phone) => {
    try {
      const bcryptPassword = await bcrypt.hash(password, saltRounds);
      const userId = uuidv4();
      const insertId = await new Promise((res, rej) => {
        const query = `INSERT INTO users(id,email,password,firstName,lastName,phone) VALUES (?,?,?,?,?,?);`;
        console.log(query);
        connection.query(
          query,
          [
            userId,
            email.toLowerCase(),
            bcryptPassword,
            firstName,
            lastName,
            phone,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              rej(new Error(err.message));
            }

            res(result);
          }
        );
      });
      console.log("console", insertId, "console");
      return {
        userId,
        bcryptPassword,
        email: email.toLowerCase(),
      };
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = userService;
