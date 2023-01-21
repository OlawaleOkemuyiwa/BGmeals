import { Fragment, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { useSelector } from "react-redux";

import LoadingSpinner from "../UI/LoadingSpinner";
import FoodItem from "./FoodItem.js";
import classes from "./Food.module.css";

const Meals = () => {
  const auth = useSelector(state => state.auth);
  const { token } = auth;

  const [restaurants, setRestaurants] = useState([]);
  const [selectedResIndex, setSelectedResIndex] = useState(0);
  const { isLoading, sendRequest: getAllRestaurants } = useHttp("food");

  const restaurantChangeHandler = event => {
    setSelectedResIndex(event.target.selectedIndex);
  };

  useEffect(() => {
    (async function () {
      const config = {
        url: "/api/restaurants/getAllRestaurants",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const allRestaurants = await getAllRestaurants(config);
      setRestaurants(allRestaurants);
    })();
  }, [token, getAllRestaurants]);

  return (
    <Fragment>
      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <div className={classes.meals}>
          <h2>Order your favorite meals</h2>
          <div className={classes.filterControl}>
            <label htmlFor="restaurants">
              Please select a restaurant to order from
            </label>
            <select id="restaurants" onChange={restaurantChangeHandler}>
              {restaurants.length > 0 &&
                restaurants.map((restaurant, index) => (
                  <option key={index} value={restaurant.name}>
                    {restaurant.name}
                  </option>
                ))}
            </select>
          </div>
          <ul className={classes.foodList}>
            {restaurants.length > 0 &&
              restaurants[selectedResIndex].menu.map(foodItem => (
                <FoodItem
                  key={foodItem._id}
                  id={foodItem._id}
                  name={foodItem.name}
                  price={foodItem.price}
                  restaurantId={foodItem.restaurantId}
                />
              ))}
          </ul>
          )
        </div>
      )}
    </Fragment>
  );
};

export default Meals;
