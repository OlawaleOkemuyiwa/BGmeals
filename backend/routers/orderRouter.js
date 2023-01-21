const express = require("express");

const {
  placeOrder,
  updateOrder,
  getUserOrders,
  getAllOrders,
  deleteAllOrders,
  downloadOrdersSheet,
} = require("../controllers/orderCtrl");
const { userAuth, adminAuth } = require("../express-middleware/auth");

const router = new express.Router();

router.post("/placeOrder", userAuth, placeOrder);

router.post("/updateOrder/:id", adminAuth, updateOrder);

router.get("/getUserOrders/:userId", userAuth, getUserOrders);

router.get("/getAllOrders", adminAuth, getAllOrders);

router.delete("/deleteOrders", adminAuth, deleteAllOrders);

router.get("/downloadOrdersSheet", adminAuth, downloadOrdersSheet);

module.exports = router;
