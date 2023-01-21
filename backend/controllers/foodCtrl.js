const { Food } = require("../models/foodModel");
const Restaurant = require("../models/restaurantModel");

const addFood = async (req, res) => {
  const { name, price } = req.body;
  const restaurantId = req.params.restaurantId;
  const food = new Food({ name, price, restaurantId });
  const restaurant = await Restaurant.findOne({ _id: restaurantId });

  restaurant.menu = restaurant.menu.concat(food);

  try {
    await restaurant.save();
    res.status(201).send(food);
  } catch (error) {
    res.status(400).send();
  }
};

const updateFood = async (req, res) => {
  const foodId = req.params.id;
  const update = req.body;

  const updateKeys = Object.keys(update);
  const fieldsThatCanBeUpdated = ["name", "price"];
  const updateIsVailid = updateKeys.every(updateKey =>
    fieldsThatCanBeUpdated.includes(updateKey)
  );

  if (!updateIsVailid) {
    return res.status(400).send({ error: "Invalid request" });
  }

  try {
    const restaurant = await Restaurant.findOne({ "menu._id": foodId });
    const foodIndex = restaurant.menu.findIndex(
      food => food._id.toString() === foodId
    );

    if (foodIndex === -1) return res.status(404).send();

    const food = restaurant.menu[foodIndex];

    updateKeys.forEach(updateKey => (food[updateKey] = update[updateKey]));

    restaurant.menu[foodIndex] = food;

    await restaurant.save();

    res.send(food);
  } catch (error) {
    res.status(500).send();
  }
};

const getFood = async (req, res) => {
  const foodId = req.params.id;
  try {
    const restaurant = await Restaurant.findOne({ "menu._id": foodId });
    const food = restaurant.menu.find(food => food._id.toString() === foodId);
    res.send(food);
  } catch (error) {
    res.status(404).send({ error: "Food item not food" });
  }
};

const getRestaurantFoods = async (req, res) => {
  const restaurantId = req.params.restaurantId;
  try {
    const restaurant = await Restaurant.findOne({ _id: restaurantId });
    if (!restaurant) res.status(404).send({ error: "Restaurant not found!" });
    const foods = restaurant.menu;
    res.send(foods);
  } catch (error) {
    res.status(500).send();
  }
};

const getAllFoods = async (req, res) => {
  try {
    const allRestaurants = await Restaurant.find({});
    let foods = [];
    allRestaurants.forEach(restaurant => {
      foods.push(restaurant.menu);
    });
    foods = foods.flat();
    res.send(foods);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const removeFood = async (req, res) => {
  const foodId = req.params.id;
  try {
    const restaurant = await Restaurant.findOne({ "menu._id": foodId });
    restaurant.menu = restaurant.menu.filter(
      food => food._id.toString() !== foodId
    );
    await restaurant.save();
    res.send({ message: "Food item successfully removed" });
  } catch (error) {
    res.status(404).send({ error: "Food item not found" });
  }
};

const removeFoods = async (req, res) => {
  const restaurantId = req.params.restaurantId;
  try {
    const restaurant = await Restaurant.findOne({ _id: restaurantId });
    restaurant.menu = [];
    await restaurant.save();
    res.send(restaurant);
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  addFood,
  updateFood,
  getFood,
  getRestaurantFoods,
  getAllFoods,
  removeFood,
  removeFoods,
};
