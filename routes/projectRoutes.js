const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createProject,
  getProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectsController");

router.post("/", auth, createProject);
router.get("/", auth, getProjects);
router.get("/:slug", auth, getProject);
router.put("/:slug", auth, updateProject);
router.delete("/:slug", auth, deleteProject);

module.exports = router;
