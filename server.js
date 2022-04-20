//Modules
const express = require("express");
const petRoutes = require("./routes/pet/pet.js");
const userRoutes = require("./routes/user/user.js");
const cors = require("cors");
const dotenv = require("dotenv");
const { postgrator } = require("./lib/db");

dotenv.config();

const app = express();
const port = process.env.PORT;
//Middleware
app.use(cors());
app.use(express.json());
app.use("/pet", petRoutes);
app.use("/user", userRoutes);

//Run application

postgrator
  .migrate()
  .then((result) => {
    console.log(`migrated db successfully:`, result);
    app.listen(process.env.PORT, () => {
      console.log(
        `server is listening at http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => console.error(error));
