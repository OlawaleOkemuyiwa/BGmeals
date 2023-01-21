const Restaurant = require("../models/restaurantModel");

const addRestaurant = async (req, res) => {
  const { name } = req.body;
  const restaurant = new Restaurant({ name });
  try {
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
  const update = req.body;

  const updateKeys = Object.keys(update);
  const fieldsThatCanBeUpdated = ["name"];
  const updateIsVailid = updateKeys.every(updateKey =>
    fieldsThatCanBeUpdated.includes(updateKey)
  );

  if (!updateIsVailid) {
    return res.status(400).send({ error: "Invalid request" });
  }

  try {
    const restaurant = await Restaurant.findOne({ _id: restaurantId });

    if (!restaurant) return res.status(404).send();

    updateKeys.forEach(
      updateKey => (restaurant[updateKey] = update[updateKey])
    );

    await restaurant.save();
    res.send(restaurant);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const restaurant = await Restaurant.findOne({ _id: restaurantId });
    res.send(restaurant);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.send(restaurants);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const deletedRestaurant = await Restaurant.findOneAndDelete({
      _id: restaurantId,
    });

    if (!deletedRestaurant) return res.status(404).send();

    res.send(deletedRestaurant);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteAllRestaurants = async (req, res) => {
  try {
    await Restaurant.deleteMany({});
    res.send({ message: "All Restaurants deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  addRestaurant,
  updateRestaurant,
  getRestaurant,
  getAllRestaurants,
  deleteRestaurant,
  deleteAllRestaurants,
};
