const express = require("express");
const authenticateToken = require("../middlewares/AuthenticateToken");

const {
  getAllUsers,
  getUserById,
  updateUserById,
  registerUser,
  registerAdmin,
  loginUser,
  changePassword,
  generateResetPasswordToken,
  resetPassword,
  deleteOneUser,
  deleteAllUsers,
  getUserOrders,
  createCart,
  getAllCarts,
  getUserCarts,
  getUserCount,
  deleteCart,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/admin/register", registerAdmin);
router.post("/login", loginUser);
router.get("/count", getUserCount);

router.get("/orders/:id", authenticateToken, getUserOrders);

router.get("/carts", authenticateToken, getAllCarts);
router.get("/carts/:id", authenticateToken, getUserCarts);
router.post("/cart", authenticateToken, createCart);
router.delete("/cart/:id", authenticateToken, deleteCart);

router.get("/", authenticateToken, getAllUsers);
router.get("/:id", authenticateToken, getUserById);
router.put("/:id", authenticateToken, updateUserById);
router.put("/:id/change-password", authenticateToken, changePassword);
router.put(
  "/:id/forgot-password",
  authenticateToken,
  generateResetPasswordToken
);
router.put("/:id/reset-password", authenticateToken, resetPassword);
router.delete("/:id", authenticateToken, deleteOneUser);
router.delete("/", authenticateToken, deleteAllUsers);

module.exports = router;
