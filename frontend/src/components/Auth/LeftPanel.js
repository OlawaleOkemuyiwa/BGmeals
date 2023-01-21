import classes from "./LeftPanel.module.css";
import bglogo from "../../assets/bglogo.png";
import AuthForm from "../Form/AuthForm";

const LeftPanel = () => {
  return (
    <div className={classes.left}>
      <figure>
        <img src={bglogo} alt="Babbangona company logo"></img>
      </figure>
      <div className={classes.formContainer}>
        <AuthForm />
      </div>
    </div>
  );
};
export default LeftPanel;
