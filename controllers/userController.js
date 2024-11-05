const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

const userController = {
  getAllUsers: async (req, res) => {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  },

  getUserById: async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user);
  },

  getUserCount: async (req, res) => {
    try {
      const userCount = await User.countDocuments();
      res.json({ count: userCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUserById: async (req, res) => {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user);
  },

  registerUser: async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({ message: "User registered successfully.", user: newUser });
  },

  registerAdmin: async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      role: "admin",
    });
    await newUser.save();
    res.json({ message: "Admin registered successfully.", user: newUser });
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_LOGIN_KEY,
      { expiresIn: "7d" }
    );
    res.json({
      message: "Login successful.",
      token,
      userId: user._id,
      role: user.role,
      user: user
    });
  },

  changePassword: async (req, res) => {
    try {
      const userId = req.params.id;
      const { oldPassword, newPassword } = req.body;

      const user = await User.findById(userId);

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect old password." });
      }

      const hashedNewPassword = await bcrypt.hashSync(newPassword, 10);

      user.password = hashedNewPassword;
      await user.save();

      res.status(200).json({ message: "Password changed successfully." });
    } catch (error) {
      console.error("Error in changePassword:", error);
      res.status(500).json({ error: error.message });
    }
  },

  generateResetPasswordToken: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET_LOGIN_KEY, {
        expiresIn: "1h",
      });

      res.json({ message: "Reset password token sent successfully.", token });
    } catch (error) {
      console.error("Error in generateResetPasswordToken:", error);
      res.status(500).json({ error: error.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      const decodedToken = jwt.verify(token, process.env.SECRET_LOGIN_KEY);
      const userId = decodedToken.id;

      const hashedPassword = await bcrypt.hashSync(newPassword, 10);

      const user = await User.findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      res.json({ message: "Password reset successfully." });
    } catch (error) {
      console.error("Error in resetPassword:", error);
      res.status(500).json({ error: error.message });
    }
  },

  deleteOneUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteAllUsers: async (req, res) => {
    try {
      await User.deleteMany({});
      res.status(204).end();
    } catch (error) {
      console.error("Error in deleteAllUsers:", error);
      res.status(500).json({ error: error });
    }
  },

  getUserOrders: async (req, res) => {
    try {
      const orders = await Order.find({ user: req.params.id })
        .populate("product user rider")
        .sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  createCart: async (req, res) => {
    try {
      const newCart = new Cart(req.body);
      await newCart.save();
      res.status(201).json(newCart);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getAllCarts: async (req, res) => {
    try {
      const carts = await Cart.find()
        .populate("product user")
        .sort({ createdAt: -1 });
      res.status(200).json(carts);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteCart: async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getUserCarts: async (req, res) => {
    try {
      const carts = await Cart.find({ user: req.params.id }).populate(
        "product user"
      );
      res.status(200).json(carts);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = userController;
