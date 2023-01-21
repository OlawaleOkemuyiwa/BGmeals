import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { authSliceActions } from "../../store/auth-slice";
import { cartSliceActions } from "../../store/cart-slice";
import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  const { sendRequest: sendLogoutRequest } = useHttp();

  const dispatch = useDispatch();

  const { isLoggedIn, token } = useSelector(state => state.auth);

  const logoutHandler = async () => {
    const config = {
      url: "/api/users/logout",
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    await sendLogoutRequest(config);

    dispatch(cartSliceActions.clearCart());
    dispatch(authSliceActions.logoutHandler());
  };

  return (
    <header className={classes.header}>
      <h1>BGmeals</h1>
      <nav>
        <ul className={classes.nav}>
          {isLoggedIn && (
            <li>
              <button className={classes.act} onClick={logoutHandler}>
                Log out
              </button>
            </li>
          )}

          {!isLoggedIn && (
            <li>
              <Link to="/auth" className={classes.act}>
                Sign In
              </Link>
            </li>
          )}

          <li>
            <CartButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
