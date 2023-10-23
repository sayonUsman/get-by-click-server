const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const userSchema = require("./schemas/userSchema");
const user = new mongoose.model("user", userSchema);
const bcrypt = require("bcrypt");

// middleware
app.use(cors());
app.use(express.json());

// get database uri
const uri = `${process.env.DB_URI}`;

// connect to database
async function main() {
  await mongoose.connect(uri);
}

main().catch((err) => console.log(err));

// save new user info to database
app.post("/sign-up", async (req, res) => {
  try {
    const existingUser = await user.findOne({ email: req.body.email }).exec();

    if (existingUser) {
      res.json({ isEmailRegistered: true });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new user({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
      });

      await newUser
        .save()
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send(err);
        });
    }
  } catch (err) {
    res.send(err);
  }
});

// get user info from database to access user account
app.post("/login", async (req, res) => {
  try {
    const existingUser = await user.findOne({ email: req.body.email }).exec();

    if (existingUser) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        existingUser.password
      );

      if (isValidPassword) {
        res.json({ isLoginSuccess: true });
      } else {
        res.json({ isLoginSuccess: false });
      }
    } else {
      res.json({ isLoginSuccess: false });
    }
  } catch (err) {
    res.send(err);
  }
});

app.get("/", (req, res) => {
  res.send("GET BY CLICK!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
