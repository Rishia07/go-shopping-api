const express = require("express");
const authenticateToken = require("../middlewares/AuthenticateToken");

const {
  createRider,
  getAllRiders,
  getOneRider,
  updateRider,
  deleteAllRiders,
  deleteOneRider,
  loginRider,
  changePassword,
  getRiderOrders,
  getRiderCount
} = require("../controllers/riderController");

const router = express.Router();

router.get("/", getAllRiders);
router.get("/riders/count", getRiderCount);
router.get("/:id", getOneRider);
router.post("/login", loginRider);

router.use(authenticateToken); 
router.post("/", createRider);
router.put("/:id", updateRider);
router.delete("/:id", deleteOneRider);
router.delete("/", deleteAllRiders);
router.put("/:id/change-password", changePassword);
router.get("/orders/:id", authenticateToken, getRiderOrders);


module.exports = router;
