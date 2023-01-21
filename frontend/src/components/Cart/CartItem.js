import { useDispatch } from "react-redux";
import { cartSliceActions } from "../../store/cart-slice";
import classes from "./CartItem.module.css";

const CartItem = props => {
  const { id, name, price, restaurantId, quantity, totalPrice } = props;
  const dispatch = useDispatch();

  const removeMealHandler = () => {
    dispatch(cartSliceActions.removeMealFromCart(id));
  };

  const addMealHandler = () => {
    dispatch(
      cartSliceActions.addFoodItemToCart({
        id,
        name,
        price,
        restaurantId,
      })
    );
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{name}</h3>
        <div className={classes.price}>
          &#8358;{totalPrice.toFixed(2)}{" "}
          <span className={classes.itemprice}>
            (&#8358;{price.toFixed(2)}/item)
          </span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeMealHandler}>-</button>
          <button onClick={addMealHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
