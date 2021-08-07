const mongoose = require("mongoose");
const slugify = require("slugify");

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true },
    completed: { type: Boolean, default: false, required: true },
    estimatedDuration: { type: Number },
    dueBy: { type: Date },
  },
  { timestamps: true }
);

projectSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, { lower: true, remove: /[*+~.()'"!?:@]/g });
  next();
});

module.exports = mongoose.model("projects", projectSchema);
