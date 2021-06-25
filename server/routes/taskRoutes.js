const router = require("express").Router();
const {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");
const auth = require("../middlewares/auth");

router.post("/projects/:id/tasks/", auth, createTask);
router.get("/projects/:id/tasks/", auth, getTasks);
router.get("/projects/:id/tasks/:taskId", auth, getTask);
router.put("/projects/:id/tasks/:taskId", auth, updateTask);
router.delete("/projects/:id/tasks/:taskId", auth, deleteTask);

module.exports = router;
