const userService = require("../data/users.js");

async function doesUserExistLogin(req, res, next) {
  const { email } = req.body;
  const db = userService.getUserServiceInstance();
  const user = await db.getUserByEmail(email);
  if (!user) {
    res.status(400).send("User with this email does not exist");
    return;
  }
  req.body.user = user;
  next();
}

module.exports = { doesUserExistLogin };
