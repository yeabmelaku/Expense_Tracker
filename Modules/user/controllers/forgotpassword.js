const mongoose = require("mongoose");
const emailManager = require("../../../managers/emailmanager");
const forgotPassword = async (req, res) => {
  const userModel = mongoose.model("user");

  const { email } = req.body;
  if (!email) throw "Email is required!";

  const getUser = await userModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email doesnot exist in the system";

  const reset_code = Math.floor(100000 + Math.random() * 900000);

  await userModel.findOneAndUpdate(
    {
      email: email,
    },
    {
      reset_code: reset_code,
    }
  );

  await emailManager(
    getUser.email,
    "Reset Your Password",
    "your password reset code is " + reset_code
  );

  res.status(200).json({
    status: "forget password",
  });
};
module.exports = forgotPassword;
