import { Link } from "react-router-dom";
import classes from "./AdminNav.module.css";

const AdminNav = () => {
  return (
    <nav className={classes.nav}>
      <ul className={classes.navList}>
        <li>
          <Link to="UsersList">UsersList</Link>
        </li>
        <li>
          <Link to="RestaurantsList">RestaurantsList</Link>
        </li>
        <li>
          <Link to="ordersList">Orders</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
