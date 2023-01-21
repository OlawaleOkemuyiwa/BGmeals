const xl = require("excel4node");
const Order = require("../models/orderModel");

const placeOrder = async (req, res) => {
  const { userName, cartItemsSummary, totalAmount } = req.body;

  const newOrder = new Order({
    name: userName,
    orderSummary: cartItemsSummary,
    orderAmount: totalAmount,
  });

  try {
    await newOrder.save();
    res.status(201).send({ message: "Order placed successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const update = req.body;

  const updateKeys = Object.keys(update);
  const fieldsThatCanBeUpdated = ["isCollected", "isPaid"];
  const updateIsVailid = updateKeys.every(updateKey =>
    fieldsThatCanBeUpdated.includes(updateKey)
  );

  if (!updateIsVailid) {
    return res.status(400).send({ error: "Invalid request" });
  }

  try {
    const order = await Order.findOne({ _id: orderId });

    if (!order) return res.status(404).send();

    updateKeys.forEach(updateKey => (order[updateKey] = update[updateKey]));

    await order.save();
    res.send(order);
  } catch (error) {
    res.status(500).send();
  }
};

const getUserOrders = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ userId: userId });
    res.send(orders);
  } catch (error) {
    res.status(404).send({ error: "Orders not found" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({});
    if (!allOrders) res.status(404).send();
    res.send(allOrders);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteAllOrders = async (req, res) => {
  try {
    await Order.deleteMany({});
    res.send({ message: "All orders deleted!" });
  } catch {
    res.status(500).send({ error: error.message });
  }
};

const downloadOrdersSheet = async (req, res) => {
  try {
    let allOrders = await Order.find({});
    if (!allOrders) return res.status(404).send("Orders not found");

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

    const wb = new xl.Workbook();
    const ws = wb.addWorksheet(
      `BG FOOD ORDER SHEET ${day} ${date} ${month}, ${year}`
    );

    const colorCell = color =>
      wb.createStyle({
        fill: {
          type: "pattern",
          fgColor: color,
          patternType: "solid",
        },
      });

    const headingColumnNames = ["Name", "OrderSummary", "Amt(NGN)"];

    let headingColumnIndex = 1;
    headingColumnNames.forEach(heading => {
      ws.cell(1, headingColumnIndex++)
        .string(heading)
        .style(colorCell("#adff2f"));
    });

    let rowIndex = 2;
    allOrders.forEach(record => {
      let columnIndex = 1;
      Object.keys(record.schema.obj).forEach(columnName => {
        if (typeof record[columnName] === "number") {
          ws.cell(rowIndex, columnIndex++).number(record[columnName]);
        } else {
          ws.cell(rowIndex, columnIndex++).string(record[columnName]);
        }
      });
      rowIndex++;
    });
    const totalArray = allOrders.map(order => order.orderAmount);
    const total = totalArray.reduce((acc, item) => acc + item, 0);
    ws.cell(allOrders.length + 2, 1)
      .string("Total")
      .style(colorCell("#1a73e8"));
    ws.cell(allOrders.length + 2, 2).style(colorCell("#1a73e8"));
    ws.cell(allOrders.length + 2, 3)
      .number(total)
      .style(colorCell("#1a73e8"));
    wb.write(`BG FOOD ORDER SHEET ${day} ${date} ${month}, ${year}.xlsx`, res);
    //xlsx
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  placeOrder,
  updateOrder,
  getUserOrders,
  getAllOrders,
  deleteAllOrders,
  downloadOrdersSheet,
};
