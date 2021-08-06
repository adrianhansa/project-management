const router = require("express").Router();
const auth = require("../middlewares/auth");

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
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.delete("/delete-account", auth, deleteAccount);

module.exports = router;
