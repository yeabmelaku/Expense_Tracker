const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwtManager = require("../../../managers/jwtmanager");
const emailManager = require("../../../managers/emailmanager");

const register = async (req, res) => {
  const userModel = mongoose.model("user");

  const { name, email, password, confirm_password, balance } = req.body;

  if (!name) throw "name is required";
  if (!email) throw "email is required";
  if (password.length < 5) throw "password must be greater than 5";
  if (password !== confirm_password)
    throw " password and confirm password mismatched";

  const getDublicateEmail = await userModel.findOne({
    email: email,
  });
  if (getDublicateEmail) throw "email is already exist";

  const salt = bcrypt.genSaltSync(4); // Use 10 rounds for better security
  const hashedPassword = bcrypt.hashSync(password, salt);

  const createdUser = await userModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  await emailManager(
    createdUser.email,
    "Welcome to Expense Tracker",
    "You are registered"
  );

  const accessToken = jwtManager(createdUser);
  res.status(200).json({
    status: "user registered",
    accessToken: accessToken,
  });
};

module.exports = register;
