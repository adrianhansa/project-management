const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.token;
  if (!token)
    return res.status(403).json({ success: false, message: "Unauthorized" });
  //verify token
  const userVerified = jwt.verify(token, process.env.JWT_SECRET);
  if (!userVerified)
    return res.status(403).json({ success: false, message: "Unauthorized" });
  req.user = userVerified.id;
  next();
};

module.exports = auth;
