const mongoose = require('mongoose');
const Event = require('./models/event');
require('dotenv').config();

const sampleEvents = [
  {
    title: "Tech Conference 2024",
    description: "Annual technology conference featuring the latest innovations in AI, blockchain, and web development.",
    date: "2024-03-15",
    venue: "Convention Center, San Francisco",
    capacity: 500,
    price: 299
  },
  {
    title: "Music Festival",
    description: "Three-day music festival with top artists from around the world.",
    date: "2024-06-20",
    venue: "Golden Gate Park, San Francisco",
    capacity: 10000,
    price: 150
  },
  {
    title: "Startup Pitch Competition",
    description: "Watch innovative startups pitch their ideas to investors.",
    date: "2024-04-10",
    venue: "Silicon Valley Tech Hub",
    capacity: 200,
    price: 50
  },
  {
    title: "Art Exhibition Opening",
    description: "Contemporary art exhibition featuring local and international artists.",
    date: "2024-05-05",
    venue: "Modern Art Museum",
    capacity: 100,
    price: 25
  },
  {
    title: "Food & Wine Tasting",
    description: "Experience the finest wines and gourmet food from local vendors.",
    date: "2024-07-12",
    venue: "Napa Valley Winery",
    capacity: 150,
    price: 89
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Insert sample events
    await Event.insertMany(sampleEvents);
    console.log('Seeded database with sample events');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
