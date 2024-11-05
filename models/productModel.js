const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    photoURL: {
      type: [String],
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Please add the title for the product"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please add the description for the product"],
    },
    category: {
      type: String,
      trim: true,
      required: [true, "Please add the category for the product"],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Please add a price for the product"],
    },
    quantity: {
      type: Number,
      trim: true,
      required: [true, "Please add a quantity for the product"],
    },
    ratings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
        trim: true,
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        trim: true,
      },
    ],
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

const product = mongoose.model("Product", productSchema);

module.exports = product;
