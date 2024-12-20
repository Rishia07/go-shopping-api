const Order = require("../models/orderModel");

const orderController = {
  createOrder: async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("product user rider")
        .sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getTodaysOrderCountForRider: async (req, res) => {
    try {
      const { riderId } = req.params;

      if (!riderId) {
        return res.status(400).json({ error: "Rider ID is required" });
      }

      // Get today's date range (start and end of day)
      
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0); // Set to midnight
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      // Query to count orders for the rider within today's date range
      const orderCount = await Order.countDocuments({
        rider: riderId,
        updatedAt: { $gte: startOfDay, $lte: endOfDay },
        status: { $in: ["Delivered", "Received"] }, // Check status
      });

      res.status(200).json({ riderId, date: new Date(), orderCount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getOneOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate(
        "product user rider"
      )
      if (!order) return res.status(404).json({ error: "Order not found" });
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteAllOrders: async (req, res) => {
    try {
      await Order.deleteMany();
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!order) return res.status(404).json({ error: "Order not found" });
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = orderController;
