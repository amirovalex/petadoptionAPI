const Ajv = require('ajv');
const ajv = new Ajv();
function validateBody(schema) {
  return (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
      res.status(400).send('Invalid input');
      return;
    }
    next()
  };
}

module.exports = { validateBody };
