const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  customerEmail: {
    type: String,
    require: true,
  },

  itemId: {
    type: String,
    require: true,
  },

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

  category: {
    type: String,
    require: true,
  },

  subcategory: {
    type: String,
    require: true,
  },
});

module.exports = itemSchema;
