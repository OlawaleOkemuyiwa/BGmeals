import useHttp from "../../hooks/use-http";
import { useSelector } from "react-redux";

import classes from "./Food.module.css";

const Food = props => {
  const { foodId, name, price } = props;
  const { sendRequest: deleteFood } = useHttp();

  const token = useSelector(state => state.auth.token);

  const foodDeleteHandler = async () => {
    const config = {
      url: `/api/foods/removeFood/${foodId}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    await deleteFood(config);

    alert(`${name} has been deleted successfully!`);
  };

  return (
    <li className={classes.food}>
      <span className={classes.name}>{name}</span>
      <span className={classes.price}>{price}</span>
      <button className="btn btn-red" onClick={foodDeleteHandler}>
        Delete
      </button>
    </li>
  );
};

export default Food;
