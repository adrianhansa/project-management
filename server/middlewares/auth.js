const jwt = require("jsonwebtoken");
const User = require("..//models/User");

const auth = async (req, res, next) => {
  try {
    //get the token
    const token = req.cookies.token;

    //get the user id
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    if (!id) {
      return res.status(403).json({ message: "Token not valid" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid token. User does not exist." });
    }

    req.user = user.id;

    next();
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

module.exports = auth;
