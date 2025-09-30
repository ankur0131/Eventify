const express = require("express");
const Event = require("../models/event");
const router = express.Router();

// List all events
router.get("/", async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
});

// Get event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create event (admin functionality - no auth here for simplicity)
router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
