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
    //To do: confirm email before creating the account
    //creating the new user
    const user = await User.create({ email, password: passwordHashed, name });
    //sending the token
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
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
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, password, passwordVerify } = req.body;
    console.log(req.body);
    const user = await User.findById(req.user);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    if (password.length > 6 && password === passwordVerify) {
      const passwordHashed = bcrypt.hash(password, 10);
      const userUpdated = await User.findByIdAndUpdate(
        req.user,
        { email, name, password: passwordHashed },
        { new: true }
      );
      sendToken(userUpdated, 200, res);
    } else {
      const userUpdated = await User.findByIdAndUpdate(
        req.user,
        { email, name },
        { new: true }
      );
      sendToken(userUpdated, 200, res);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    //to do: send an email confirming the account was deleted successfully
    res.status(200).json({ success: true, message: "Account deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const logout = async (req, res) => {
  try {
    res.header("token", null);
    res.status(200).json({ message: "Logout", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
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
