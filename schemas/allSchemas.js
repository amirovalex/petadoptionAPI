const S = require("fluent-json-schema");

exports.signUpSchema = S.object()
  .prop("firstName", S.string().required())
  .prop("lastName", S.string().required())
  .prop("email", S.string().required())
  .prop("password", S.string().minLength(3).required())
  .prop("repassword", S.string().minLength(3).required())
  .prop("admin", S.string())
  .valueOf();

exports.loginSchema = S.object()
  .prop("email", S.string().required())
  .prop("password", S.string().minLength(3).required())
  .valueOf();

exports.addPetSchema = S.object()
  .prop("name", S.string().required())
  .prop("type", S.string().required())
  .prop("picture", S.string())
  .prop("hypoallergenic", S.string())
  .valueOf();
