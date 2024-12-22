const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/emailmanager");

const resetPassword = async (req, res) => {
  const userModel = mongoose.model("user");
  const { email, new_password, reset_code } = req.body;
  if (!email) throw "Email is required!";
  if (!new_password) throw "New password is required!";
  if (!reset_code) throw "Reset code is required";

  const getUser = await userModel.findOne({
    email,
  });

  if (!getUser) throw "This email doesnot exist in the system";
  if (getUser.reset_code !== reset_code) throw "Reset code is incorrect";
  const salt = bcrypt.genSaltSync(4); // Use 10 rounds for better security
  const hashedPassword = bcrypt.hashSync(new_password, salt);

  await userModel.findOneAndUpdate(
    { email },
    {
      password: hashedPassword,
      reset_code: "",
    } // if you want to update the reset code as well
  );

  await emailManager(
    getUser.email,
    "Password Reset Successfully",
    "Your password has been reset successfully"
  );

  res.status(200).json({
    status: "password reset",
    data: {
      email,
      new_password,
    },
  });
};

module.exports = resetPassword;
