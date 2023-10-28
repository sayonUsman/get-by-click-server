const mongoose = require("mongoose");

const trendingCollectionSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  uri: {
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

  remarks: {
    type: String,
    require: true,
  },
});

module.exports = trendingCollectionSchema;
