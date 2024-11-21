const express = require("express");
const authenticateToken = require("../middlewares/AuthenticateToken");

const {
  createOrder,
  getAllOrders,
  getOneOrder,
  updateOrder,
  deleteAllOrders,
  getTodaysOrderCountForRider
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getOneOrder);
router.get("/:riderId/orders/today", getTodaysOrderCountForRider);

router.use(authenticateToken);
router.post("/", createOrder);

router.put("/:id", updateOrder);
router.delete("/", deleteAllOrders);

module.exports = router;
