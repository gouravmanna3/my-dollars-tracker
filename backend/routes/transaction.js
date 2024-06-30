const express = require("express");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income");
const {
  addExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/expenses");
const {
  registerUser,
  loginUser,
  logoutUser,
  auth,
  verifyToken,
} = require("../controllers/auth");
const router = express.Router();

router
  .post("/add-income", auth, addIncome)
  .get("/get-incomes", auth, getIncomes)
  .delete("/delete-income/:id", auth, deleteIncome)
  .post("/add-expense", auth, addExpense)
  .get("/get-expenses", auth, getExpenses)
  .delete("/delete-expense/:id", auth, deleteExpense)
  .post("/register", registerUser)
  .post("/login", loginUser)
  .post("/logout", logoutUser)
  .get("/verify-token", verifyToken);

module.exports = router;
