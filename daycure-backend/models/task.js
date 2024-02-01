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
  type: {
    type: String,
    enum: ["Goal", "Social", "Routine", "Timing", "Normal"],
  },
  subType: {
    type: String,
    enum: ["birthday", "wedding", "party", "event"],
  },
  routineType: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly"],
  },
  duration: {
    hours: {
      type: Number,
      default: 0,
    },
    minutes: {
      type: Number,
      default: 0,
    },
  },
  progress: {
    hours: {
      type: Number,
      default: 0,
    },
    minutes: {
      type: Number,
      default: 0,
    },
  },
  position: {
    type: Object,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
