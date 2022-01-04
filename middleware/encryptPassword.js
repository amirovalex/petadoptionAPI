const bcrypt = require("bcrypt");

function encryptPassword(req, res, next) {
  if (req.body.password) {
    const { password } = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        res.status(500).send("Error Encrypting");
        return;
      }
      req.body.hashPassword = hash;
      next();
    });
  } else {
    next();
  }
}

module.exports = { encryptPassword };
