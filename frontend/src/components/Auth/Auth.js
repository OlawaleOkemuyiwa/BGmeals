import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import classes from "./Auth.module.css";

const Auth = () => {
  return (
    <div className={classes.authPage}>
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

export default Auth;
