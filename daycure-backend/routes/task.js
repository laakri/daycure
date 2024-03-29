const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Add task
router.post("/add-task", async (req, res) => {
  try {
    const {
      user,
      date,
      description,
      isCompleted,
      isImportant,
      type,
      subType,
      duration,
      routineType,
    } = req.body;

    // Create a new Task instance
    const newTask = new Task({
      user,
      date,
      description,
      isCompleted,
      isImportant,
      type,
      subType,
      routineType,
      duration: {
        hours: duration && duration.hours ? duration.hours : 0,
        minutes: duration && duration.minutes ? duration.minutes : 0,
      },
      progress: {
        hours: 0,
        minutes: 0,
      },
    });

    const savedTask = await newTask.save();

    res
      .status(201)
      .json({ message: "Task added successfully", task: savedTask });
    console.log("Task added successfully");
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Failed to add task" });
  }
});

router.get("/tasks-by-user/:userId", async (req, res) => {
  try {
    const requestedUserId = req.params.userId;

    const tasks = await Task.find({ user: requestedUserId });

    const formattedTasks = tasks.map((task) => {
      return {
        ...task.toObject(),
        date: task.date.toISOString().split("T")[0],
      };
    });

    res.status(200).json(formattedTasks);
  } catch (error) {
    console.error("Error fetching tasks by user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Update task by ID
router.put("/update-task-iscompleted/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { isCompleted } = req.body;
  try {
    const taskToUpdate = await Task.findById(taskId);

    if (!taskToUpdate) {
      return res.status(404).json({ error: "Task not found" });
    }

    taskToUpdate.isCompleted = isCompleted;

    const updatedTask = await taskToUpdate.save();

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Update task progress by ID

router.put("/update-task-progress/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { progressHours, progressMinutes } = req.body;

  try {
    const taskToUpdate = await Task.findById(taskId);

    if (!taskToUpdate) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the task progress
    taskToUpdate.progress.hours = progressHours;
    taskToUpdate.progress.minutes = progressMinutes;

    const updatedTask = await taskToUpdate.save();

    res.status(200).json({
      message: "Task progress updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task progress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete task progress by ID
router.delete("/delete-task/:taskId", async (req, res) => {
  const { taskId } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
