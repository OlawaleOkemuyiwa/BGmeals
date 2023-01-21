const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOOSE_URL);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDB connection successful!");
});

db.on("error", () => {
  console.log("MongoDB connection failed!");
});

module.exports = mongoose;
