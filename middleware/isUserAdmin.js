const userService = require("../data/users.js");

async function isUserAdmin(req, res, next) {
  console.log(req.user);
  const { id } = req.user;
  const db = userService.getUserServiceInstance();
  const user = await db.getUserById(id);
  if (!user.admin) {
    res.status(400).send("User is not authorized for this action");
    return;
  }
  next();
}

module.exports = { isUserAdmin };
