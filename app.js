require("express-async-errors");

const errorHandler = require("./handlers/errorHandler");
require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(process.env.mongodb_conn, {})
  .then(() => {
    console.log("successfully connected");
  })
  .catch(() => {
    console.log("connection failed");
  });
const app = express();
app.use(cors());
// import routes

require("./Models/user.model");
require("./Models/transaction.model");

// declare routes

app.use(express.json());

const userRoute = require("./Modules/user/controllers/user.route");
app.use("/api/user", userRoute);
const transactionRoute = require("./Modules/transaction/transaction.route");
app.use("/api/transaction", transactionRoute);

// end of all routes

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "not found",
  });
});

app.use(errorHandler);

app.listen(8000, () => {
  console.log("server successful");
});
