import { useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import classes from "./User.module.css";

const User = props => {
  const token = useSelector(state => state.auth.token);
  const { sendRequest: deleteUserRequest } = useHttp();
  const { userId, name, email } = props;

  const deleteUserHandler = async () => {
    const config = {
      url: `/api/users/deleteUser/${userId}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    await deleteUserRequest(config);
    alert(`${name} deleted!`);
  };

  return (
    <div className={classes.user}>
      <span className={classes.id}>{userId}</span>
      <span className={classes.name}>{name}</span>
      <span className={classes.email}>{email}</span>
      <button onClick={deleteUserHandler} className="btn btn-red">
        Delete
      </button>
    </div>
  );
};

export default User;
