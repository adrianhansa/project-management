const jwt = require("jsonwebtoken");

const sendToken = (user, codeStatus, res) => {
  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET
  );
  res
    .status(codeStatus)
    .header("token", token)
    .json({ success: true, token, id: user._id });
};

module.exports = sendToken;
