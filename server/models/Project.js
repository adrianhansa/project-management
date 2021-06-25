const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
      maxLength: [55, "The name cannot be longer than 55 characters."],
    },
    slug: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "not started",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("projects", projectSchema);
