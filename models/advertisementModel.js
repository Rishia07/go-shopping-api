const mongoose = require("mongoose");

const advertisemntSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const advertisement = mongoose.model("Advertisement", advertisemntSchema);

module.exports = advertisement;
