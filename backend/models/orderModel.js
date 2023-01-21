const mongoose = require("../db/mongoose");

const orderschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    orderSummary: {
      type: String,
      required: true,
    },
    orderAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = new mongoose.model("Order", orderschema);

module.exports = Order;
