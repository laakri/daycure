const express = require("express");
const router = express.Router();
const Event = require("../models/event");

// Add task
router.post("/add-event", async (req, res) => {
  try {
    const { userId, date, description, isImportant, type } = req.body;

    const newEvent = new Event({
      user: userId,
      date,
      description,
      isImportant,
      type,
    });

    const savedEvent = await newEvent.save();

    res
      .status(201)
      .json({ message: "Event added successfully", event: savedEvent });
    console.log("Event added successfully");
  } catch (error) {
    console.error("Error adding Event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update task by ID
router.put("/update-event-iscompleted/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const eventToUpdate = await Event.findById(eventId);

    if (!eventToUpdate) {
      return res.status(404).json({ error: "event not found" });
    }
    const updatedEvent = await eventToUpdate.save();

    res
      .status(200)
      .json({ message: "event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/events-by-user/:userId", async (req, res) => {
  try {
    const requestedUserId = req.params.userId;

    const events = await Event.find({ user: requestedUserId });

    const formattedEvent = events.map((event) => {
      return {
        ...event.toObject(),
        date: event.date.toISOString().split("T")[0],
      };
    });

    res.status(200).json(formattedEvent);
  } catch (error) {
    console.error("Error fetching events by user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
