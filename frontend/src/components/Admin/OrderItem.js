import classes from "./OrderItem.module.css";

const Order = props => {
  const { userName, orderSummary, orderAmount } = props;

  return (
    <li className={classes.order}>
      <span className={classes.name}>{userName}</span>
      <span className={classes.summary}>{orderSummary}</span>
      <span className={classes.amount}>&#8358;{orderAmount}</span>
    </li>
  );
};

export default Order;
