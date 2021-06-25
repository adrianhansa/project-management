const bcrypt = require("bcryptjs");
const User = require("../models/User");
const sendToken = require("../utils/sendToken");

const register = async (req, res) => {
  try {
    const { email, password, passwordVerify, name } = req.body;
    if (!email || !password || !passwordVerify || !name) {
      return res.status(400).json({ message: "Please complete all fields." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "The password must have at least 6 characters." });
    }
    if (password !== passwordVerify) {
      return res
        .status(400)
        .json({ message: "The two passwords do not match." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message:
          "There is already an account regsitered for this email address. Please login.",
      });
    }
    const user = await User.create({ email, password, name });
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Both fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Wrong email/password." });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Wrong password" });
    }
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("token")
      .json({ message: "Logged out successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, logout };
