const mongoose = require("mongoose");

const allCollectionSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  url: {
    type: String,
    require: true,
  },

  price: {
    type: String,
    require: true,
  },

  offer: {
    type: String,
  },

  category: {
    type: String,
    require: true,
  },

  subcategory: {
    type: String,
    require: true,
  },

  remarks: {
    type: String,
    require: true,
  },
});

module.exports = allCollectionSchema;
