const Rating = require("../models/ratingModel");

const ratingController = {
  createRating: async (req, res) => {
    try {
      const newRating = new Rating(req.body);
      await newRating.save();
      res.status(201).json(newRating);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getAllRatings: async (req, res) => {
    try {
      const Ratings = await Rating.find()
        .populate("user ratings reviews")
        .sort({ createdAt: -1 });
      res.status(200).json(Ratings);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getOneRating: async (req, res) => {
    try {
      const Rating = await Rating.findById(req.params.id).populate(
        "user ratings reviews"
      );
      res.status(200).json(Rating);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateRating: async (req, res) => {
    try {
      const Rating = await Rating.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(Rating);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteOneRating: async (req, res) => {
    try {
      await Rating.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Rating deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteAllRatings: async (req, res) => {
    try {
      await Rating.deleteMany({});
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = ratingController;
