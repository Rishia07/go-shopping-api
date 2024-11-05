const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema(
  {
    profilePic: {
      type: String,
      trim: true,
    },
    driversIdPic: {
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
    vehicle: {
      type: String,
      required: [true, "Please enter a value for vehicle."],
      trim: true,
    },
    plateNumber: {
      type: String,
      required: [true, "Please enter a value for plate number."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a value for password."],
    },
  },
  {
    timestamps: true,
  }
);

const Rider = mongoose.model("Rider", riderSchema);

module.exports = Rider;
