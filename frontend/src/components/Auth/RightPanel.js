import classes from "./RightPanel.module.css";
import eatingImage from "../../assets/eat.png";

const RightPanel = () => {
  return (
    <figure className={classes.right}>
      <img src={eatingImage} alt="Two people having a meal"></img>
    </figure>
  );
};

export default RightPanel;
