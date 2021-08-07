const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");

router.post("/:slug/tasks/", auth, createTask);
router.get("/:slug/tasks/", auth, getTasks);
router.get("/:slug/tasks/:id", auth, getTask);
router.put("/:slug/tasks/:id", auth, updateTask);
router.delete("/:slug/tasks/:id", auth, deleteTask);

module.exports = router;
