const mongoose = require("mongoose");

const dashBoard = async (req, res) => {
  const userModel = mongoose.model("user");
  const transactionModel = mongoose.model("transaction");

  const getUser = await userModel
    .findOne({
      _id: req.user._id,
    })
    .select("-password");
  const transaction = await transactionModel
    .find({
      user_id: req.user._id,
    })
    .sort("-createdAt")
    .limit(5);

  res.status(200).json({
    status: "success",
    data: getUser,
    transaction,
  });
};

module.exports = dashBoard;
