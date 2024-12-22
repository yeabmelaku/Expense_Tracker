const express = require("express");
const addIncome = require("./controllers/addincome");
const addExpense = require("./controllers/addexpense");
const getTransaction = require("./controllers/gettransaction");
const deleteTransaction = require("./controllers/deletetransaction");
const auth = require("../../middleware/auth");

const transactionRoute = express.Router(); // Use Router here

transactionRoute.use(auth);

transactionRoute.post("/addincome", addIncome);
transactionRoute.post("/addexpense", addExpense);
transactionRoute.get("/gettransaction", getTransaction);
transactionRoute.delete("/:transaction_id", deleteTransaction);

module.exports = transactionRoute;
