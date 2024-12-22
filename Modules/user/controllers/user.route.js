const express = require("express");
const register = require("./register");
const login = require("./login");
const dashBoard = require("./dashBoard");
const auth = require("../../../middleware/auth");
const forgotPassword = require("./forgotpassword");

const resetPassword = require("./resetpassword");

const userRoute = express.Router(); // Use Router here

userRoute.post("/register", register); // Define the POST route
userRoute.post("/login", login);
userRoute.post("/forgotpw", forgotPassword);
userRoute.post("/resetpw", resetPassword);

userRoute.use(auth);

userRoute.get("/userDashBoard", dashBoard);

module.exports = userRoute;
