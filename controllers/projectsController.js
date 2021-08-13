const Project = require("../models/Project");
const slugify = require("slugify");
const moment = require("moment");

const createProject = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Name field is required." });
    if (name.length > 55)
      return res.status(400).json({
        success: false,
        message: "The project name cannot be longer than 55 characters.",
      });
    const dueBy = moment().add(Number(req.body.estimatedDuration), "days");
    const project = await Project.create({ user: req.user, name, dueBy });
    res.status(200).json(project });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user }).populate(
      "user",
      "name -_id"
    );
    res.status(200).json({ success: true, projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    const slug = req.params.slug;
    if (!slug)
      return res
        .status(400)
        .json({ success: false, message: "Invalid request, no id provided." });
    const project = await Project.findOne({ slug, user: req.user }).populate(
      "user",
      "name -_id"
    );
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    res.status(200).json({ success: true, project });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const slug = req.params.slug;
    if (!slug)
      return res
        .status(400)
        .json({ success: false, message: "Invalid request, no id provided." });
    const project = await Project.findOne({ slug, user: req.user });
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    const { name, completed } = req.body;
    if (!name)
      return res.status(400).json({
        success: false,
        message: "The project name must be provided.",
      });
    if (name.length > 55)
      return res.status(400).json({
        success: false,
        message: "The project name cannot be longer than 55 characters.",
      });
    const slugUpdated = slugify(name, {
      lower: true,
      remove: /[*+~.()'"!?:@]/g,
    });
    const updatedProject = await Project.findByIdAndUpdate(
      project._id,
      { name, slug: slugUpdated, completed },
      { new: true }
    );
    res.status(200).json({ success: true, updatedProject });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const slug = req.params.slug;
    if (!slug)
      return res
        .status(400)
        .json({ success: false, message: "Invalid request, no id provided." });
    const project = await Project.findOne({ slug, user: req.user });
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    //to do: delete subsequent tasks
    await Project.findByIdAndDelete(project._id);
    res.status(200).json({ success: true, message: "Project deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
