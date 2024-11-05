const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      trim: true,
      required: [true, "Please add the rating for the rating"],
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

const rating = mongoose.model("Rating", ratingSchema);

module.exports = rating;
