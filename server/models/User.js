const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Your name has to have at least 3 characters."],
      maxLength: [15, "Your name cannot have more than 15 characters."],
    },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      minLength: [6, "Your password muyst have at least 6 characters."],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model("users", userSchema);
