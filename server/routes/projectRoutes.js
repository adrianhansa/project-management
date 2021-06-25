const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createProject,
  getProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectsController");

router.get("/", auth, getProjects);
router.post("/", auth, createProject);
router.put("/:id", auth, updateProject);
router.get("/:slug", auth, getProject);
router.delete("/:slug", auth, deleteProject);

module.exports = router;
