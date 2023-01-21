const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const foodRouter = require("./routers/foodRouter");
const restaurantRouter = require("./routers/restaurantRouter");
const userRouter = require("./routers/userRouter");
const orderRouter = require("./routers/orderRouter");

//server.js file runs just once setting up the express server, middlewares, routes etc
//on the running of the app. The code is parsed from top to bottom, one after the other. The middlewares are also only just set up. The middlewares don't run until a request is sent from client or user agent to our server. Then the request passes through the middleware stack and a response is sent back depending on the order and functionality of the middlewares already set up and route handling functions. Every request sent goes through the middleware stack.
//the callback of app.listen method is only called when this app is done parsing its code from top to bottom regardless of where app.listen() is put (either top most or bottom of our file).
//app.use is just like a collective method for handling all types of http request to the server e.g get, post, delete etc. This is why our middlewares [app.use(middleware)] always run for ALL request types e.g get, post, put, delete etc

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api/foods", foodRouter);
app.use("/api/restaurants", restaurantRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

if (process.env.NODE_ENV === "production") {
  console.log("IN PRODUCTION");
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
  );
} else {
  console.log("IN DEVELOPMENT");
  app.get("/", (req, res) => {
    res.send({ message: "Welcome to BGmeals API" });
  });
}

app.use("*", (req, res) => {
  res.status(404).send({ error: "unknown route" });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
