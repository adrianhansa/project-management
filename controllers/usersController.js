const User = require("../models/User");
const sendToken = require("../utils/sendToken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { name, email, password, passwordVerify } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: "The password must contain at least 6 characters.",
      });
    if (password !== passwordVerify)
      return res
        .status(400)
        .json({ success: false, message: "The two passwords do not match" });
    //check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        message:
          "There is already an account registered with this email address.",
        success: false,
      });
    //hashing the password
    const passwordHashed = await bcrypt.hash(password, 10);
    //creating the new user
    const user = await User.create({ email, password: passwordHashed, name });
    //sending the token
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email/password required." });
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email/password." });
    //check password
    const passwordVerified = await bcrypt.compare(password, user.password);
    if (!passwordVerified)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email/password." });
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    res.send("User profile");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).json({ message: "Logout", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  deleteAccount,
};
