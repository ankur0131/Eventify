const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  venue: String,
  capacity: Number,
  price: Number
});

module.exports = mongoose.model("Event", eventSchema);
