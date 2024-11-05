const Advertisement = require("../models/advertisementModel");

const AdvertisementController = {
  createAdvertisement: async (req, res) => {
    try {
      const newAdvertisement = new Advertisement(req.body);
      await newAdvertisement.save();
      res.status(201).json(newAdvertisement);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getAllAdvertisements: async (req, res) => {
    try {
      const advertisements = await Advertisement.find().sort({ createdAt: -1 })
      res.status(200).json(advertisements);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getOneAdvertisement: async (req, res) => {
    try {
      const advertisement = await Advertisement.findById(req.params.id)
      res.status(200).json(advertisement);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateAdvertisement: async (req, res) => {
    try {
      const advertisement = await Advertisement.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(advertisement);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  addRating: async (req, res) => {
    try {
      const { id } = req.params;
      const { user, rating } = req.body;

      const advertisement = await Advertisement.findById(id);
      const hasRated = Advertisement.ratings.some((rate) => rate.user === user);

      if (hasRated) {
        return res
          .status(400)
          .json({ error: "You have already rated this Advertisement" });
      }

      advertisement.ratings.push({ user, rating });
      await  advertisement.save();

      res.status(200).json({ message: "Rating added successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteOneAdvertisement: async (req, res) => {
    try {
      await Advertisement.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Advertisement deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteAllAdvertisements: async (req, res) => {
    try {
      await Advertisement.deleteMany({});
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = AdvertisementController;
