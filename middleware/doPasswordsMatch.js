function doPasswordsMatch(req, res, next) {
  const { password, repassword } = req.body;
  if (password !== repassword) {
    res.status(400).send('Passwords Dont Match');
    return;
  }
  next();
}


module.exports = {doPasswordsMatch}
