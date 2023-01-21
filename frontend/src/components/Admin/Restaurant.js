import { Fragment, useState, useRef } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import Food from "./Food";
import classes from "./Restaurant.module.css";

const Restaurant = props => {
  const { restuarantId, name } = props;

  const [showAddFood, setShowAddFood] = useState(false);
  const [showFoods, setShowFoods] = useState(false);
  const [foods, setFoods] = useState([]);

  const foodNameInputRef = useRef(null);
  const foodPriceInputRef = useRef(null);

  const token = useSelector(state => state.auth.token);

  const { sendRequest: deleteRestaurantRequest } = useHttp();
  const { sendRequest: postNewFood } = useHttp();
  const { isLoading, sendRequest: getFoods } = useHttp("foods");

  const deleteRestaurantHandler = async () => {
    const config = {
      url: `/api/restaurants/deleteRestaurant/${restuarantId}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    await deleteRestaurantRequest(config);

    alert(`${name} has been deleted successfully!`);
  };

  const showAddFoodHandler = () => {
    setShowAddFood(true);
  };

  const addFoodHandler = async event => {
    event.preventDefault();

    const enteredName = foodNameInputRef.current.value;
    const enteredPrice = foodPriceInputRef.current.value;

    if (
      !enteredName ||
      enteredName.trim() === 0 ||
      !isNaN(parseInt(enteredName.trim(), 10))
    ) {
      alert("Please provide a valid name");
      return;
    }

    if (
      !enteredPrice ||
      enteredPrice.trim() === 0 ||
      isNaN(parseInt(enteredPrice.trim(), 10))
    ) {
      alert("Please provide a valid price");
      return;
    }

    const config = {
      url: `/api/foods/addFood/${restuarantId}`,
      method: "POST",
      body: {
        name: enteredName,
        price: parseInt(enteredPrice, 10),
      },
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };

    await postNewFood(config);

    alert(`${enteredName} has been successfully added to ${name}'s menu`);

    setShowAddFood(false);
  };

  const showFoodsHandler = async () => {
    setShowFoods(true);

    const config = {
      url: `/api/foods/getRestaurantFoods/${restuarantId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const foods = await getFoods(config);

    setFoods(foods);
  };

  return (
    <Fragment>
      <li className={classes.restaurant}>
        <span className={classes.id}>{restuarantId}</span>
        <span className={classes.name}>{name}</span>
        <button onClick={showAddFoodHandler} className="btn btn-green">
          Add Food
        </button>
        <button className="btn btn-red" onClick={showFoodsHandler}>
          Delete Food
        </button>
        <button onClick={deleteRestaurantHandler} className="btn btn-red">
          Delete Restaurant
        </button>
      </li>
      {showAddFood && (
        <form onSubmit={addFoodHandler}>
          <label htmlFor="food-name">Name</label>
          <input type="text" id="food-name" ref={foodNameInputRef} />
          <label htmlFor="food-price">Price</label>
          <input type="number" id="food-price" ref={foodPriceInputRef} />
          <div className={classes.box}>
            <button className="btn btn-green">Add</button>
          </div>
        </form>
      )}
      {showFoods &&
        (isLoading ? (
          <div className="centered">
            <LoadingSpinner />
          </div>
        ) : (
          <ul>
            {foods.length > 0 &&
              foods.map(food => (
                <Food
                  key={food._id}
                  foodId={food._id}
                  name={food.name}
                  price={food.price}
                />
              ))}
          </ul>
        ))}
    </Fragment>
  );
};

export default Restaurant;
