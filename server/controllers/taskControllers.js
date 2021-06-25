const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.id });
    res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description)
      return res
        .status(400)
        .json({ message: "The task description is required" });
    const task = await Task.create({
      description,
      project: req.params.id,
    });
    res.status(201).json({ success: true, task });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { description, completed } = req.body;
    if (!description)
      return res
        .status(400)
        .json({ message: "The task description is required" });
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { description, completed, project: req.params.id },
      { new: true }
    );
    res.status(200).json({ success: true, updatedTask });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks, getTask, updateTask, deleteTask, createTask };
