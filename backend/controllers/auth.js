const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

const handleError = (err) => {
  if (err.code === 11000) {
    return { message: "Email is already registered" };
  }
};

const createToken = (user) => {
  return jwt.sign({ user }, secretKey, {
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
    const token = createToken(user);

    // Set the JWT token as an HTTP-only cookie that expires in 24 hours
    res.cookie("jwtToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 86400000),
    });

    // Send a 200 response with the user's details in the JSON response
    res.status(200).json({ name: user.fullName, email: user.email });
  } catch (err) {
    // If an error occurs, send a 400 response with the error details
    res.status(400).json({ err });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("jwtToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out" });
};

const auth = async (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const verifyToken = async (req, res) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    // Token is valid
    res.status(200).json({ user: decoded.user });
  });
};

module.exports = { registerUser, loginUser, logoutUser, auth, verifyToken };
