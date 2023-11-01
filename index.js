const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const userSchema = require("./schemas/userSchema");
const user = new mongoose.model("user", userSchema);
const bcrypt = require("bcrypt");
const trendingCollectionSchema = require("./schemas/trendingCollectionSchema");
const trendingCollections = new mongoose.model(
  "trending-collection",
  trendingCollectionSchema
);
const allCollectionSchema = require("./schemas/allCollectionSchema");
const allCollections = new mongoose.model(
  "all-collection",
  allCollectionSchema
);

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

// get different type of collections from database
app.get("/collections", async (req, res) => {
  try {
    const newCollections = await allCollections
      .find({ remarks: "NEW ARRIVALS" })
      .limit(4)
      .select({
        category: 0,
        subcategory: 0,
        remarks: 0,
      })
      .exec();

    const popularCollections = await allCollections
      .find({ remarks: "POPULAR" })
      .limit(4)
      .select({
        category: 0,
        subcategory: 0,
        remarks: 0,
      })
      .exec();

    const coolCollections = await allCollections
      .find({ remarks: "COOL" })
      .limit(4)
      .select({
        category: 0,
        subcategory: 0,
        remarks: 0,
      })
      .exec();
    res.send({ newCollections, popularCollections, coolCollections });
  } catch (err) {
    res.send(err);
  }
});

// get all collections from database
app.get("/all-collections", async (req, res) => {
  try {
    const collections = await allCollections.find().exec();
    res.send(collections);
  } catch (err) {
    res.send(err);
  }
});

// get all trending collections from database
app.get("/trending-collections", async (req, res) => {
  try {
    const collections = await trendingCollections
      .find()
      .select({
        remarks: 0,
      })
      .exec();
    res.send(collections);
  } catch (err) {
    res.send(err);
  }
});

// get all new collections from database
app.get("/new-collections", async (req, res) => {
  try {
    const collections = await allCollections
      .find({ remarks: "NEW ARRIVALS" })
      .exec();
    res.send(collections);
  } catch (err) {
    res.send(err);
  }
});

// get all popular collections from database
app.get("/popular-collections", async (req, res) => {
  try {
    const collections = await allCollections
      .find({ remarks: "POPULAR" })
      .exec();
    res.send(collections);
  } catch (err) {
    res.send(err);
  }
});

// get all cool collections from database
app.get("/cool-collections", async (req, res) => {
  try {
    const collections = await allCollections.find({ remarks: "COOL" }).exec();
    res.send(collections);
  } catch (err) {
    res.send(err);
  }
});

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
