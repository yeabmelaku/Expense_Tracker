const mongoose = require("mongoose");
const getTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transaction");
  console.log(req.query);
  const data = await transactionModel.find({
    user_id: req.user._id,
    ...req.query,
  });
  res.status(200).json({
    status: "sucessful",
    message: data,
  });
};

module.exports = getTransaction;
