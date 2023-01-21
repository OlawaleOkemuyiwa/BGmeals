import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import classes from "./Cart.module.css";
import Card from "../UI/Card";
import CartItem from "./CartItem";
import { cartSliceActions } from "../../store/cart-slice";
import useHttp from "../../hooks/use-http";

const Cart = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isLoading, sendRequest: postOrderRequest } = useHttp();

  const auth = useSelector(state => state.auth);
  const { userInfo, token } = auth;

  const cart = useSelector(state => state.cart);
  const { cartItems, totalAmount } = cart;

  const cartItemsSummary = cartItems.map(cartItem => cartItem.name).join(", ");

  const orderConfirmedHandler = async () => {
    const order = {
      userName: userInfo.name,
      cartItemsSummary,
      totalAmount,
    };

    const config = {
      url: "/api/orders/placeOrder",
      method: "POST",
      body: order,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    await postOrderRequest(config);

    alert("Your Order Successfully Placed!");
    dispatch(cartSliceActions.clearCart());
    navigate("/meals", { replace: true });
  };

  const orderBtnDisabled =
    cartItems.length === 0 ? true : isLoading ? true : false;

  return (
    <Card className={classes.cart}>
      <h2>Order Summary</h2>
      <ul>
        {cartItems.length > 0 &&
          cartItems.map(foodItem => (
            <CartItem
              key={foodItem.id}
              id={foodItem.id}
              name={foodItem.name}
              price={foodItem.price}
              quantity={foodItem.quantity}
              restaurantId={foodItem.restaurantId}
              totalPrice={foodItem.totalPrice}
            />
          ))}
      </ul>
      <p className={classes.totalAmount}>
        Total Amount: &#8358;{totalAmount.toFixed(2)}
      </p>
      <div className={classes.cartActions}>
        <Link to="/meals">Go back</Link>
        <button disabled={orderBtnDisabled} onClick={orderConfirmedHandler}>
          Order
        </button>
      </div>
    </Card>
  );
};

export default Cart;
