let express = require("express");
const userService = require("../../data/users.js");
const jwt = require("jsonwebtoken");
let router = express.Router();
const dotenv = require("dotenv");
const auth = require("../../middleware/auth");
//Routes

//GET ROUTES

//GETS ALL USERS IN DB
router.get("/", async (req, res) => {
  try {
    const db = userService.getUserServiceInstance();
    const result = await db.getAllUsers();
    console.log(result);
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

//POST ROUTES

//SIGNUP USER
router.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    const db = userService.getUserServiceInstance();
    const result = await db.addUser(
      email,
      password,
      firstName,
      lastName,
      phone
    );

    const user = {
      email,
      firstName,
      lastName,
      phone,
      id: result.userId,
    };

    const token = jwt.sign({ user }, process.env.USER_TOKEN, {
      expiresIn: "2h",
    });

    user.token = token;

    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

//LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("login!!!", process.env.USER_TOKEN);
    const db = userService.getUserServiceInstance();
    const result = await db.loginUser(email, password);

    const user = {
      id: result.id,
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
      phone: result.phone,
      bio: result.bio,
      admin: result.admin,
    };
    const token = jwt.sign(user, process.env.USER_TOKEN, {
      expiresIn: "2h",
    });

    // save user token
    user.token = token;
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

//PUT ROUTES

//UPDATE USER
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { password, email, firstName, lastName, phone, bio } = req.body;

    const db = userService.getUserServiceInstance();
    const result = await db.updateUser(
      id,
      password,
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

module.exports = router;
