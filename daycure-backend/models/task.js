const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isImportant: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  position: {
    type: Object,
  },
  type: {
    type: String,
    enum: ["Goal", "Social", "Routine", "Timing", "Normal"],
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
