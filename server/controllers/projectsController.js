const Project = require("../models/Project");
const Task = require("../models/Task");
const slugify = require("slugify");

const createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const user = req.user;
    if (!user) return res.status(403).json({ message: "Unauthorized" });
    if (!name)
      return res.status(400).json({ message: "The project name is required." });
    //check if name exists for the user
    const existingProject = await Project.findOne({ name }).where({ user });
    if (existingProject) {
      return res.status(400).json({
        message:
          "You already have a project with this name. Please choose another one.",
      });
    }
    const slug = slugify(name, { lower: true, remove: /[*+~.,()'"?!:@]/g });
    const project = await Project.create({ name, slug, user });
    res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      user: req.user,
    });
    res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user });
    res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { name, status } = req.body;
    const project = await Project.findById(req.params.id);
    const existingProject = await Project.findOne({ name, user: req.user });
    if (existingProject)
      return res.status(400).json({
        message:
          "You already have a project with this name, please use another one.",
      });
    const slug = slugify(name, { lower: true, remove: /[*+~.,()'"?!:@]/g });
    const updatedProject = await Project.findByIdAndUpdate(
      project._id,
      { name, status, slug },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      user: req.user,
      slug: req.params.slug,
    });
    await Project.findByIdAndDelete(project._id);
    if (project.user.toString() !== req.user)
      return res.status(403).json({
        message: "You are not authorized to delete other users' projects.",
      });
    //delete related tasks
    await Task.deleteMany({ project: project.id });
    res.status(204).json({ message: "Project deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getProject,
  getProjects,
  updateProject,
  deleteProject,
};
