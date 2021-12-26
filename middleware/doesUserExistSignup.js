const userService = require("../data/users.js");

async function doesUserExistSignup(req, res, next) {
  const { email } = req.body;
  const db = userService.getUserServiceInstance();
  const user = await db.getUserByEmail(email);
  if (user) {
    res.status(400).send("User Already Exist");
    return;
  }
  next();
}

module.exports = { doesUserExistSignup };
