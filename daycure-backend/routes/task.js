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

    // Save the task to the database
    await newTask.save();

    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/tasks-by-user/:userId", async (req, res) => {
  try {
    const requestedUserId = req.params.userId;

    // Find tasks for the specified user
    const tasks = await Task.find({ user: requestedUserId });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks by user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
