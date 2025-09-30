const express = require("express");
const jwt = require("jsonwebtoken");
const Booking = require("../models/booking");
const Event = require("../models/event");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Middleware for token
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No token" });
  const token = auth.split(" ")[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Create booking
router.post("/", authMiddleware, async (req, res) => {
  const { event_id, seats } = req.body;
  try {
    const event = await Event.findById(event_id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const booked = await Booking.aggregate([
      { $match: { event: event._id } },
      { $group: { _id: null, total: { $sum: "$seats" } } }
    ]);

    const totalBooked = booked[0]?.total || 0;
    if (totalBooked + seats > event.capacity) {
      return res.status(400).json({ error: "Not enough seats" });
    }

    const booking = await Booking.create({
      user: req.user.id,
      event: event._id,
      seats
    });

    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get my bookings
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("event", "title date venue");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
