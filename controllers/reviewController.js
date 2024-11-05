const Review = require("../models/reviewModel");

const reviewController = {
  createReview: async (req, res) => {
    try {
      const newReview = new Review(req.body);
      await newReview.save();
      res.status(201).json(newReview);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getAllReviews: async (req, res) => {
    try {
      const Reviews = await Review.find()
        .populate("user")
        .sort({ createdAt: -1 });
      res.status(200).json(Reviews);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getOneReview: async (req, res) => {
    try {
      const Review = await Review.findById(req.params.id).populate("user");
      res.status(200).json(Review);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateReview: async (req, res) => {
    try {
      const Review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(Review);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteOneReview: async (req, res) => {
    try {
      await Review.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteAllReviews: async (req, res) => {
    try {
      await Review.deleteMany({});
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = reviewController;
