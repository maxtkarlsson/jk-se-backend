const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["ring", "necklace", "earring", "bracelet"],
    required: true,
  },
  imageUrls: {
    productImages: {
      small: {
        type: [String],
        required: true,
      },
      medium: {
        type: [String],
        required: true,
      },
      large: {
        type: [String],
        required: true,
      },
    },
    modelImages: {
      small: {
        type: [String],
      },
      medium: {
        type: [String],
      },
      large: {
        type: [String],
      },
    },
  },
});

module.exports = mongoose.model("Product", ProductSchema);
