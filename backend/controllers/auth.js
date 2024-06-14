const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

const handleError = (err) => {
  console.log(err.message);

  if (err.code === 11000) {
    return { message: "Email is already registered" };
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, secretKey, {
    expiresIn: "1h",
  });
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

// Route to handle user login and set JWT cookie
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });
    if (!(user && (await bcrypt.compare(password, user.password)))) {
      return res
        .status(404)
        .json({ message: "Authentication failed! Invalid email or password" });
    }

    // If authentication is successful, create a JWT token with the user's ID
    const token = createToken(user._id);

    // Set the JWT token as an HTTP-only cookie that expires in 24 hours
    res.cookie("jwtToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 86400000),
    });

    // Send a 200 response with the user's details in the JSON response
    res.status(200).json({ name: user.fullName, email: user.email });
  } catch (err) {
    // If an error occurs, send a 400 response with the error details
    console.log("ERROR ###########", err);
    res.status(400).json({ err });
  }
};

const logoutUser = (req, res) => {};

const auth = async (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      console.log("decoded", decoded);
      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user);
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { registerUser, loginUser, logoutUser, auth };
