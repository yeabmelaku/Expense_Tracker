const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../managers/jwtmanager");

const login = async (req, res) => {
  const userModel = mongoose.model("user");

  const { email, password } = req.body;
  const getUser = await userModel.findOne({
    email: email,
  });

  if (!getUser) throw "email is not available";

  const comparePassword = await bcrypt.compare(password, getUser.password);

  if (!comparePassword) throw "try again";
  const accessToken = jwtManager(getUser);

  // correct
  res.status(200).json({
    status: "success",
    message: "user logged in successfully",
    accessToken: accessToken,
  });
};

module.exports = login;
