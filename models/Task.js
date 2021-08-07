const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: "projects" },
    completed: { type: Boolean, default: false },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasks", taskSchema);
