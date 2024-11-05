const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    photoURL: {
      type: [String],
      trim: true,
    },
    review: {
      type: String,
      trim: true,
      required: [true, "Please add the description for the review"],
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

const review = mongoose.model("Review", reviewSchema);

module.exports = review;
