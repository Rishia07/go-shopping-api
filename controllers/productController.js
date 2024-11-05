const Product = require("../models/productModel");
const calculateRating = require("../utils/calculateRating");

const ProductController = {
  createProduct: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find()
        .lean()
        .populate({
          path: "reviews",
          populate: {
            path: "user",
            model: "User",
            select: "firstName lastName profilePic",
          },
        })
        .populate({
          path: "ratings", 
          select: "rating",
        })
        .sort({ createdAt: -1 })
        .exec();

      const updatedProducts = products.map((product) => {
        const totalRating = calculateRating(product.ratings);
        const totalReviews = product.reviews.length;

        return {
          ...product,
          totalRating,
          totalReviews,
        };
      });

      res.status(200).json(updatedProducts);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getOneProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
        .lean()
        .populate({
          path: "reviews",
          populate: {
            path: "user",
            model: "User",
            select: "firstName lastName profilePic",
          },
        })
        .populate({
          path: "ratings", 
          select: "rating",
        })
        .exec();

      const totalRating = calculateRating(product.ratings);
      const totalReviews = product.reviews.length;

      const updatedProduct = {
        ...product,
        totalRating,
        totalReviews,
      };

      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  addRating: async (req, res) => {
    try {
      const { id } = req.params;
      const { user, rating } = req.body;

      const product = await Product.findById(id);
      const hasRated = Product.ratings.some((rate) => rate.user === user);

      if (hasRated) {
        return res
          .status(400)
          .json({ error: "You have already rated this Product" });
      }

      product.ratings.push({ user, rating });
      await product.save();

      res.status(200).json({ message: "Rating added successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteOneProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteAllProducts: async (req, res) => {
    try {
      await Product.deleteMany({});
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = ProductController;
