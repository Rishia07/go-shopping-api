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
