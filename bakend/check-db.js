const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

console.log('\n🔍 Checking MongoDB Connection...');
console.log(`MongoDB URI: ${MONGO_URI}\n`);

async function checkConnection() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    
    console.log('✅ MongoDB connection successful!');
    console.log(`   Database: ${mongoose.connection.name}`);
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Port: ${mongoose.connection.port}`);
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`\n📦 Collections (${collections.length}):`);
    collections.forEach(col => console.log(`   - ${col.name}`));
    
    // Count documents
    const User = require('./models/user');
    const Event = require('./models/event');
    const Booking = require('./models/booking');
    
    const userCount = await User.countDocuments();
    const eventCount = await Event.countDocuments();
    const bookingCount = await Booking.countDocuments();
    
    console.log(`\n📊 Document Counts:`);
    console.log(`   Users: ${userCount}`);
    console.log(`   Events: ${eventCount}`);
    console.log(`   Bookings: ${bookingCount}`);
    
    if (eventCount === 0) {
      console.log('\n⚠️  No events found. Run "npm run seed" to populate test data.');
    }
    
    await mongoose.connection.close();
    console.log('\n✅ All checks passed!\n');
    process.exit(0);
    
  } catch (err) {
    console.error('\n❌ MongoDB connection failed!');
    console.error(`   Error: ${err.message}`);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check if MongoDB is running');
    console.error('   2. Verify MONGO_URI in .env file');
    console.error('   3. Check network/firewall settings\n');
    process.exit(1);
  }
}

checkConnection();
