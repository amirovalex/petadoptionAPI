//Modules
const express = require("express");
const petRoutes = require("./routes/pet/pet.js");
const userRoutes = require("./routes/user/user.js");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;
//Middleware
app.use(cors());
app.use(express.json());
app.use("/pet", petRoutes);
app.use("/user", userRoutes);

//Run application
app.listen(port, () => {
  console.log("listening on port " + port);
});
