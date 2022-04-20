//Modules
const express = require("express");
const petRoutes = require("./routes/pet/pet.js");
const userRoutes = require("./routes/user/user.js");
const cors = require("cors");
const dotenv = require("dotenv");
const { postgrator } = require("./lib/db");

dotenv.config();

const app = express();
const port = process.env.PORT || 7070;
//Middleware
app.use(cors({ origin: "https://amirovalex.github.io/petadoption/" }));
app.use(express.json());
app.use("/pet", petRoutes);
app.use("/user", userRoutes);

//Run application

// postgrator
//   .migrate()
//   .then((result) => {
//     console.log(`migrated db successfully:`, result);
const run = async () => {
  try {
    app.listen(port, () => {
      console.log(`server is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

run();
