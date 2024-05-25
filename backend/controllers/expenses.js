const Expense = require("../models/IncomeModel");

const addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = Expense({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    res.status(201).json({ message: "Income Added Successfully" });
  } catch (e) {
    res.status(500).json({ message: "Server Error! Failed to Add" });
  }
  console.log(income);
};

const getExpenses = async (req, res) => {
  try {
    const expense = await Expense.find().sort({ createdAt: -1 });
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
