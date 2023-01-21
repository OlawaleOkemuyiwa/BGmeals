const express = require("express");
const { userAuth, adminAuth } = require("../express-middleware/auth");

const {
  addFood,
  updateFood,
  removeFood,
  removeFoods,
  getFood,
  getRestaurantFoods,
  getAllFoods,
} = require("../controllers/foodCtrl");

const router = new express.Router();

router.post("/addFood/:restaurantId", adminAuth, addFood);

router.patch("/updateFood/:id", adminAuth, updateFood);

router.get("/getFood/:id", userAuth, getFood);

router.get("/getRestaurantFoods/:restaurantId", adminAuth, getRestaurantFoods);

router.get("/getFoods", userAuth, getAllFoods);

router.delete("/removeFood/:id", adminAuth, removeFood);

router.delete("/removeFoods/:restaurantId", adminAuth, removeFoods);

module.exports = router;
