const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;
    const token = authHeaders.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send("A token is required for authentication");
    }
    const decoded = jwt.verify(token, config.USER_TOKEN);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  } finally {
    return next();
  }
};

module.exports = verifyToken;
