import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import User from "./User";
import classes from "./UsersList.module.css";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const token = useSelector(state => state.auth.token);
  const { isLoading, sendRequest: getAllUsers } = useHttp("users");

  useEffect(() => {
    (async function () {
      const config = {
        url: "/api/users/getUsers",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const data = await getAllUsers(config);
      setUsers(data);
    })();
  }, [token, getAllUsers]);

  return (
    <Fragment>
      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <ul className={classes.usersList}>
          {users.map(user => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              email={user.email}
            />
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default UsersList;
