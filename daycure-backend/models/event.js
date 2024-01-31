const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
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
 
  type: {
    type: String,
    enum: ["birthday", "wedding", "event"],
  },
  position: {
    type: Object,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
