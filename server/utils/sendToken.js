const jwt = require("jsonwebtoken");

module.exports = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token", token, { httpOnly: true })
    .json({ name: user.name, id: user._id });
};
