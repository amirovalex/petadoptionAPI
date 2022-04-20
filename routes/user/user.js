let express = require("express");
const userService = require("../../data/users.js");
const jwt = require("jsonwebtoken");
let router = express.Router();
const dotenv = require("dotenv");
const auth = require("../../middleware/auth.js");
const { encryptPassword } = require("../../middleware/encryptPassword.js");
const {
  doesUserExistLogin,
} = require("../../middleware/doesUserExistLogin.js");
const {
  doesUserExistSignup,
} = require("../../middleware/doesUserExistSignup.js");
const { doPasswordsMatch } = require("../../middleware/doPasswordsMatch.js");
const { signUpSchema, loginSchema } = require("../../schemas/allSchemas");
const { validateBody } = require("../../middleware/validateBody.js");
const { isUserAdmin } = require("../../middleware/isUserAdmin.js");

//Routes

//GET ROUTES

//GETS ALL USERS IN DB
router.get("/", auth, isUserAdmin, async (req, res) => {
  try {
    const db = userService.getUserServiceInstance();
    const result = await db.getAllUsers();
    res.send({ data: result });
  } catch (err) {
    console.log(err);
  }
});

//GET USER BY ID
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const db = userService.getUserServiceInstance();
  const result = await db.getUserById(id);

  res.send(result);
});

//GET USER BY ID FULL
router.get("/:id/full", auth, (req, res) => {
  const { id } = req.params;

  res.send("SENDING FULL USER");
});

//PUT ROUTES

//UPDATE USER
router.put("/:id", auth, encryptPassword, async (req, res) => {
  try {
    const { id } = req.params;
    const { hashPassword, email, firstName, lastName, phone, bio } = req.body;

    const db = userService.getUserServiceInstance();
    const result = await db.updateUser(
      id,
      hashPassword,
      email,
      firstName,
      lastName,
      phone,
      bio
    );
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

//POST ROUTES

//SIGNUP USER
router.post(
  "/signup",
  validateBody(signUpSchema),
  doesUserExistSignup,
  doPasswordsMatch,
  encryptPassword,
  async (req, res) => {
    try {
      const { email, hashPassword, firstName, lastName, phone, admin } =
        req.body;
      const createdDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const db = userService.getUserServiceInstance();
      const result = await db.addUser(
        email,
        hashPassword,
        firstName,
        lastName,
        phone,
        createdDate,
        admin
      );
      const user = {
        email,
        firstName,
        lastName,
        phone,
        id: result.id,
      };
      const token = jwt.sign({ id: user.id }, process.env.USER_TOKEN, {
        expiresIn: "2h",
      });

      user.token = token;

      res.send({ token: user.token });
    } catch (err) {
      console.log(err);
    }
  }
);

//LOGIN USER
router.post(
  "/login",
  validateBody(loginSchema),
  doesUserExistLogin,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const db = userService.getUserServiceInstance();
      const result = await db.loginUser(email, password);
      console.log("THEEEE RESULT", result);
      const user = {
        id: result[0].id,
        email: result[0].email,
        firstName: result[0].firstName,
        lastName: result[0].lastName,
        phone: result[0].phone,
        bio: result[0].bio,
        admin: result[0].admin,
      };
      console.log("user", user);
      const token = jwt.sign({ id: user.id }, process.env.USER_TOKEN, {
        expiresIn: "2h",
      });

      // save user token
      user.token = token;
      res.send({ token: user.token });
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
