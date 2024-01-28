const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.post("/add-task", async (req, res) => {
  try {
    const { userId, date, description, isImportant } = req.body;

    // Create a new task with the provided data, including the user reference
    const newTask = new Task({
      user: userId,
      date,
      description,
      isImportant,
    });
    console.log(newTask);
    // Save the task to the database
    const savedTask = await newTask.save();

    res
      .status(201)
      .json({ message: "Task added successfully", task: savedTask });
    console.log("Task added successfully");
  } catch (error) {
    console.error("Error adding task:", error);
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

module.exports = router;