const mongoose = require("mongoose");

const validator = require("validator");

const addExpense = async (req, res) => {
  const transactionModel = mongoose.model("transaction");
  const userModel = mongoose.model("user");

  const { amount, remarks } = req.body;
  if (!amount) throw "amount must needed";
  if (!remarks) throw "Remarks is required";
  if (remarks.length < 5) throw " must be lessthan 5";
  if (!validator.isNumeric(amount.toString())) throw "please input number";
  if (amount < 0) throw "amount can't be negative";

  await transactionModel.create({
    user_id: req.user._id,
    amount: amount,
    remarks: remarks,
    transaction_type: "expense",
  });
  await userModel.updateOne(
    {
      _id: req.user._id,
    },
    {
      $inc: {
        balance: amount * -1,
      },
    }
  );

  res.status(200).json({
    status: "Expense added",
  });
};

module.exports = addExpense;
