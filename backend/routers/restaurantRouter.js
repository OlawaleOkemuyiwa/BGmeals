const express = require("express");

const { adminAuth, userAuth } = require("../express-middleware/auth");

const {
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  deleteAllRestaurants,
  getRestaurant,
  getAllRestaurants,
} = require("../controllers/restaurantCtrl");

const router = new express.Router();

router.post("/addRestaurant", adminAuth, addRestaurant);

router.patch("/updateRestaurant/:id", adminAuth, updateRestaurant);

router.get("/getRestaurant/:id", adminAuth, getRestaurant);

router.get("/getAllRestaurants", userAuth, getAllRestaurants);

router.delete("/deleteRestaurant/:id", adminAuth, deleteRestaurant);

router.delete("/deleteAllRestaurants", adminAuth, deleteAllRestaurants);

module.exports = router;
