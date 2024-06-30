const Expense = require("../models/ExpenseModel");
const User = require("../models/UserModel");

const addExpense = async (req, res) => {
  const { title, amount, category, description, date, user_id } = req.body;

  const expense = Expense({
    user_id,
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!user_id || !title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await expense.save();
    res
      .status(201)
      .json({ data: expense, message: "Expense Added Successfully" });
  } catch (e) {
    res.status(500).json({ message: "Server Error! Failed to Add" });
  }
};

const getExpenses = async (req, res) => {
  const { user_id } = req.params;
  try {
    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const expense = await Expense.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  Expense.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: "Expense Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error" });
    });
};

module.exports = { addExpense, getExpenses, deleteExpense };
