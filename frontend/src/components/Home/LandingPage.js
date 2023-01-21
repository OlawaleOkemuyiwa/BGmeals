import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MainHeader from "../Layout/MainHeader";
import classes from "./LandingPage.module.css";

const LandingPage = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <div className={classes.landingPage}>
      <MainHeader />
      <div className={classes.headingBox}>
        <h1 className={classes.primaryHeading}>
          <span>Welcome to BGmeals</span>
          <span>your home of delightful dishes</span>
        </h1>
        <Link to={isLoggedIn ? "/meals" : "/auth"}>Explore our meals</Link>
      </div>
    </div>
  );
};

export default LandingPage;
