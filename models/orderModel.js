const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    price: {
      type: String,
      trim: true,
      required: [true, "Please add the price for the order"],
    },
    quantity: {
      type: Number,
      trim: true,
      required: [true, "Please add a quantiy for the order"],
    },
    status: {
      type: String,
      enum: ["Pending", "To Ship", "To Receive", "Delivered", "Received"],
      default: "Pending",
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
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rider",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const order = mongoose.model("Order", orderSchema);

module.exports = order;
