const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Rider = require("../models/riderModel");
const Order = require("../models/orderModel");

const riderController = {
  getAllRiders: async (req, res) => {
    try {
      const riders = await Rider.find().sort({ createdAt: -1 });
      res.json(riders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOneRider: async (req, res) => {
    // Changed the method name for consistency
    const riderId = req.params.id;
    try {
      const rider = await Rider.findById(riderId);
      if (!rider) {
        return res.status(404).json({ message: "Rider not found." });
      }
      res.json(rider);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRiderCount: async (req, res) => {
    try {
      const riderCount = await Rider.countDocuments();
      res.json({ count: riderCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateRider: async (req, res) => {
    // Changed the method name for consistency
    const riderId = req.params.id;
    try {
      const rider = await Rider.findByIdAndUpdate(riderId, req.body, {
        new: true,
      });
      if (!rider) {
        return res.status(404).json({ message: "Rider not found." });
      }
      res.json(rider);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createRider: async (req, res) => {
    // Changed the method name for consistency
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      vehicle,
      plateNumber,
      password,
    } = req.body;
    try {
      const existingRider = await Rider.findOne({ email });
      if (existingRider) {
        return res.status(400).json({ error: "Email already in use." });
      }

      const hashedPassword = await bcrypt.hashSync(password, 10);

      const newRider = new Rider({
        // Changed from new rider(...) to new Rider(...)
        firstName,
        lastName,
        email,
        phoneNumber,
        vehicle,
        plateNumber,
        password: hashedPassword,
      });

      await newRider.save();
      res
        .status(201)
        .json({ message: "Rider registered successfully.", rider: newRider });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  loginRider: async (req, res) => {
    const { email, password } = req.body;
    try {
      const rider = await Rider.findOne({ email });
      if (!rider || !(await bcrypt.compare(password, rider.password))) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const token = jwt.sign(
        { id: rider._id, email: rider.email },
        process.env.SECRET_LOGIN_KEY,
        { expiresIn: "7d" }
      );

      res.json({ message: "Login successful.", token, riderId: rider._id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  changePassword: async (req, res) => {
    const riderId = req.params.id;
    const { oldPassword, newPassword } = req.body;
    try {
      const rider = await Rider.findById(riderId);
      if (!rider) {
        return res.status(404).json({ message: "Rider not found." });
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, rider.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect old password." });
      }

      const hashedNewPassword = await bcrypt.hashSync(newPassword, 10);
      rider.password = hashedNewPassword;
      await rider.save();

      res.status(200).json({ message: "Password changed successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  generateResetPasswordToken: async (req, res) => {
    const { email } = req.body;
    try {
      const rider = await Rider.findOne({ email });
      if (!rider) {
        return res.status(404).json({ message: "Rider not found." });
      }

      const token = jwt.sign({ id: rider._id }, process.env.SECRET_LOGIN_KEY, {
        expiresIn: "1h",
      });

      res.json({ message: "Reset password token sent successfully.", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  resetPassword: async (req, res) => {
    const { token, newPassword } = req.body;
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_LOGIN_KEY);
      const riderId = decodedToken.id;

      const hashedPassword = await bcrypt.hashSync(newPassword, 10);
      const rider = await Rider.findByIdAndUpdate(
        riderId,
        { password: hashedPassword },
        { new: true }
      );

      if (!rider) {
        return res.status(404).json({ message: "Rider not found." });
      }

      res.json({ message: "Password reset successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRiderOrders: async (req, res) => {
    try {
      const orders = await Order.find({
        rider: req.params.id,
        status: { $in: ["To Ship", "Delivered"] },
      })
        .populate("product user rider")
        .sort({ createdAt: -1 });
        
      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteOneRider: async (req, res) => {
    try {
      await Rider.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Rider deleted successfully." });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteAllRiders: async (req, res) => {
    try {
      await Rider.deleteMany({});
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = riderController;
