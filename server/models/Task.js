const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasks", taskSchema);
