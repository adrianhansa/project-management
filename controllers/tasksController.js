const Task = require("../models/Task");
const Project = require("../models/Project");

const createTask = async (req, res) => {
  try {
    const project = await Project.findOne({
      user: req.user,
      slug: req.params.slug,
    });
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    if (!req.body.description)
      return res
        .status(400)
        .json({ success: false, message: "Task description is required." });
    const task = await Task.create({
      description: req.body.description,
      project: project._id,
    });
    res.status(200).json({ success: true, task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found." });
    res.status(200).json({ success: true, task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      user: req.user,
    });
    const tasks = await Task.find({ project: project._id }).populate(
      "project",
      "name dueBy -_id"
    );
    res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    if (!req.body.description)
      return res.status(400).json({
        success: false,
        message: "Please provide a description for this task.",
      });
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { description: req.body.description, completed: req.body.completed },
      { new: true }
    );
    res.status(200).json({ success: true, task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found." });
    res.status(200).json({ success: true, message: "Task deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createTask, getTask, getTasks, updateTask, deleteTask };
