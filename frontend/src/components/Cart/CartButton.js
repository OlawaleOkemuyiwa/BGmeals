import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import classes from "./CartButton.module.css";

const CartButton = () => {
  const cartQuantity = useSelector(state => state.cart.totalQuantity);

  return (
    <Link to="/cart" className={classes.navBtn}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </Link>
  );
};

export default CartButton;
