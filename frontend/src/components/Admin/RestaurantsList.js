import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import Restaurant from "./Restaurant";
import classes from "./RestaurantList.module.css";

const RestaurantLists = () => {
  const [restaurants, setRestarants] = useState([]);

  const [showAddRestaurant, setShowAddRestaurant] = useState(false);

  const { isLoading, sendRequest: getAllRestaurants } = useHttp("restaurants");
  const { sendRequest: postNewRestaurant } = useHttp();

  const inputRef = useRef(null);

  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    (async function () {
      const config = {
        url: "/api/restaurants/getAllRestaurants",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const data = await getAllRestaurants(config);
      setRestarants(data);
    })();
  }, [token, getAllRestaurants]);

  const showAddRestaurantModal = () => {
    setShowAddRestaurant(true);
  };

  const resFormSubmitHandler = async event => {
    event.preventDefault();

    const restaurantName = inputRef.current.value;

    if (
      !restaurantName ||
      restaurantName.trim() === 0 ||
      !isNaN(parseInt(restaurantName.trim(), 10))
    ) {
      alert("Please provide a valid restaurant name");
      return;
    }

    const config = {
      url: "/api/restaurants/addRestaurant",
      method: "POST",
      body: {
        name: restaurantName,
      },
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };

    await postNewRestaurant(config);

    alert(`${restaurantName} added successfully!`);

    setShowAddRestaurant(false);
  };

  return (
    <Fragment>
      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <div className={classes.container}>
          <button className="btn btn-green" onClick={showAddRestaurantModal}>
            Add a new restaurant
          </button>
          {showAddRestaurant && (
            <form onSubmit={resFormSubmitHandler}>
              <label htmlFor="restaurant">Restaurant name</label>
              <input type="text" id="restaurant" ref={inputRef} />
              <div className={classes.actBox}>
                <button type="submit" className="btn btn-green">
                  Add
                </button>
              </div>
            </form>
          )}
          <ul className={classes.restaurantsList}>
            {restaurants.map(restaurant => (
              <Restaurant
                key={restaurant._id}
                restuarantId={restaurant._id}
                name={restaurant.name}
              />
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default RestaurantLists;
