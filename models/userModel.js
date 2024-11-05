const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    profilePic: {
      type: String,
      trim: true,
    },
    validIdPic: {
      type: String,
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "Please enter a value for first name."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please enter a value for last name."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter a value for email."],
      trim: true,
      unique: true,
    },
    address: {
      houseNumber: {
        type: String,
        trim: true,
      },
      street: {
        type: String,
        trim: true,
      },
      barangay: {
        type: String,
        trim: true,
      },
      municipality: {
        type: String,
        trim: true,
      },
      province: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter a value for phoneNumber."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a value for password."],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
