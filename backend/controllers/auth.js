const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const handleError = (err) => {
  console.log(err.message);

  if (err.code === 11000) {
    return { message: "Email is already registered" };
  }
};

const registerUser = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const newUser = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const user = await newUser.save();
    res
      .status(201)
      .json({ user: user._id, message: "Registration Successfull" });
  } catch (err) {
    const error = handleError(err);
    res.status(400).json({ error });
  }
};

module.exports = { registerUser };
