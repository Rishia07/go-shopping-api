const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    price: {
      type: String,
      trim: true,
      required: [true, "Please add the price for the cart"],
    },
    quantity: {
      type: Number,
      trim: true,
      required: [true, "Please add a quantiy for the cart"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      trim: true,
      required: [true, "Please add a user id"],
    },
  },
  {
    timestamps: true,
  }
);

const cart = mongoose.model("Cart", cartSchema);

module.exports = cart;
