const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["question", "order"],
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNr: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Request", RequestSchema);
