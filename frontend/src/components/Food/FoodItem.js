import { useDispatch } from "react-redux";

import Card from "../UI/Card";
import classes from "./FoodItem.module.css";
import { cartSliceActions } from "../../store/cart-slice";

const FoodItem = props => {
  const dispatch = useDispatch();
  const { id, name, price, restaurantId } = props;

  const addToCartHandler = () => {
    dispatch(
      cartSliceActions.addFoodItemToCart({ id, name, price, restaurantId })
    );
  };

  return (
    <li className={classes.foodItem}>
      <Card>
        <header>
          <h3>{name}</h3>
          <div className={classes.price}>&#8358;{price.toFixed(2)}</div>
        </header>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default FoodItem;
