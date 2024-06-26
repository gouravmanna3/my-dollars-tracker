const Income = require("../models/IncomeModel");
const User = require("../models/UserModel");

const addIncome = async (req, res) => {
  const { title, amount, category, description, date, user_id } = req.body;
  const income = Income({
    user_id,
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

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await income.save();
    res
      .status(201)
      .json({ data: income, message: "Income Added Successfully" });
  } catch (e) {
    res.status(500).json({ message: "Server Error! Failed to Add" });
  }
  console.log(income);
};

const getIncomes = async (req, res) => {
  console.log(req.params);
  const { user_id } = req.params;
  try {
    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const incomes = await Income.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteIncome = async (req, res) => {
  const { id } = req.params;
  Income.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};

module.exports = { addIncome, getIncomes, deleteIncome };
