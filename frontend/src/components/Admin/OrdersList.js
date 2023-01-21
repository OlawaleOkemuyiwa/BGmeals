import { Fragment, useEffect, useState } from "react";
import fileDownload from "js-file-download";
import { useSelector } from "react-redux";

import LoadingSpinner from "../UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import Order from "./OrderItem";
import classes from "./OrderList.module.css";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  const { isLoading, sendRequest: getOrders } = useHttp("orders");
  const { sendRequest: deleteOrders } = useHttp();

  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    (async function () {
      const config = {
        url: "/api/orders/getAllOrders",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const data = await getOrders(config);
      setOrders(data);
    })();
  }, [token, getOrders]);

  const ordersDeleteHandler = async () => {
    const config = {
      url: "/api/orders/deleteOrders",
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    await deleteOrders(config);

    alert("All order items successfully deleted!");
  };

  const ordersDownloadHandler = async () => {
    try {
      const response = await fetch("/api/orders/downloadOrdersSheet", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const now = new Date();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const date = now.getDate();
      const day = days[now.getDay()];
      const month = months[now.getMonth()];
      const year = now.getFullYear();

      const data = await response.blob();
      fileDownload(
        data,
        `BG FOOD ORDER SHEET ${day} ${date} ${month}, ${year}.xlsx`
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Fragment>
      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <Fragment>
          {orders.length > 0 ? (
            <div className={classes.ordersContainer}>
              <div className="centered">
                <button
                  className="btn btn-green"
                  onClick={ordersDownloadHandler}
                >
                  Fetch Day's Orders
                </button>
              </div>
              <div className="centered" style={{ margin: "1rem 0" }}>
                <button className="btn btn-red" onClick={ordersDeleteHandler}>
                  Clear Day's Orders
                </button>
              </div>
              <ul className={classes.ordersList}>
                {orders.map(order => (
                  <Order
                    key={order._id}
                    userName={order.name}
                    orderSummary={order.orderSummary}
                    orderAmount={order.orderAmount}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <p className="centered" style={{ margin: "1rem 0" }}>
              No order available
            </p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrdersList;
