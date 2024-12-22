const mongoose = require("mongoose");
const validator = require("validator");

const deleteTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transaction");
  const { transaction_id } = req.params;
  if (!validator.isMongoId(transaction_id.toString()))
    throw "Invalid transaction_id";

  const gettransaction = await transactionModel.findOne({
    _id: transaction_id,
  });
  if (!transaction_id) throw "transaction_id is required";

  if (gettransaction.transaction_type === "income") {
    await userModel.updateOne(
      {
        _id: gettransaction.user_id,
      },
      {
        $inc: {
          balance: gettransaction.amount * -1,
        },
      }
    );
  } else {
    await userModel.updateOne(
      {
        _id: gettransaction.user_id,
      },
      {
        $inc: {
          balance: gettransaction.amount,
        },
      }
    );
  }

  await transactionModel.deleteOne({ _id: transaction_id });

  res.status(200).json({
    status: "delete transaction",
  });
};

module.exports = deleteTransaction;
