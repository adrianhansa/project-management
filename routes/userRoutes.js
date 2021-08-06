const router = require("express").Router();
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  deleteAccount,
} = require("../controllers/usersController");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.delete("/delete-account", deleteAccount);

module.exports = router;
