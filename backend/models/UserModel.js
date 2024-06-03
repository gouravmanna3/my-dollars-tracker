const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

module.exports = mongoose.model("User", userSchema);
