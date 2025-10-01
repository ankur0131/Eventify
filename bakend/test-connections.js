const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';
const MONGO_URI = process.env.MONGO_URI;

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

// Test MongoDB Connection
async function testMongoConnection() {
  logSection('Testing MongoDB Connection');
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    log('✅ MongoDB connection successful', 'green');
    log(`   Connected to: ${MONGO_URI}`, 'blue');
    
    // Test database operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    log(`   Found ${collections.length} collections:`, 'blue');
    collections.forEach(col => log(`      - ${col.name}`, 'blue'));
    
    return true;
  } catch (err) {
    log('❌ MongoDB connection failed', 'red');
    log(`   Error: ${err.message}`, 'red');
    return false;
  }
}

// Test Backend Server
async function testBackendServer() {
  logSection('Testing Backend Server');
  try {
    const response = await axios.get(BACKEND_URL);
    log('✅ Backend server is running', 'green');
    log(`   Response: ${JSON.stringify(response.data)}`, 'blue');
    return true;
  } catch (err) {
    log('❌ Backend server is not responding', 'red');
    log(`   Error: ${err.message}`, 'red');
    log(`   Make sure server is running on ${BACKEND_URL}`, 'yellow');
    return false;
  }
}

// Test Auth Routes
async function testAuthRoutes() {
  logSection('Testing Auth Routes');
  const testUser = {
    name: 'Test User',
    email: `test_${Date.now()}@example.com`,
    password: 'testpassword123'
  };

  try {
    // Test Register
    log('Testing POST /api/auth/register...', 'yellow');
    const registerRes = await axios.post(`${BACKEND_URL}/api/auth/register`, testUser);
    log('✅ Register endpoint working', 'green');
    log(`   User created: ${registerRes.data.user.email}`, 'blue');
    log(`   Token received: ${registerRes.data.token.substring(0, 20)}...`, 'blue');

    // Test Login
    log('\nTesting POST /api/auth/login...', 'yellow');
    const loginRes = await axios.post(`${BACKEND_URL}/api/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    log('✅ Login endpoint working', 'green');
    log(`   Token received: ${loginRes.data.token.substring(0, 20)}...`, 'blue');

    return { success: true, token: loginRes.data.token };
  } catch (err) {
    log('❌ Auth routes failed', 'red');
    log(`   Error: ${err.response?.data?.error || err.message}`, 'red');
    return { success: false };
  }
}

// Test Events Routes
async function testEventsRoutes() {
  logSection('Testing Events Routes');
  
  try {
    // Test GET all events
    log('Testing GET /api/events...', 'yellow');
    const eventsRes = await axios.get(`${BACKEND_URL}/api/events`);
    log('✅ Get all events endpoint working', 'green');
    log(`   Found ${eventsRes.data.length} events`, 'blue');
    
    if (eventsRes.data.length > 0) {
      const firstEvent = eventsRes.data[0];
      log(`   Sample event: ${firstEvent.title}`, 'blue');
      
      // Test GET event by ID
      log('\nTesting GET /api/events/:id...', 'yellow');
      const eventRes = await axios.get(`${BACKEND_URL}/api/events/${firstEvent._id}`);
      log('✅ Get event by ID endpoint working', 'green');
      log(`   Event: ${eventRes.data.title}`, 'blue');
      
      return { success: true, eventId: firstEvent._id };
    } else {
      log('   No events found in database', 'yellow');
      log('   Run "npm run seed" to populate test data', 'yellow');
      return { success: true, eventId: null };
    }
  } catch (err) {
    log('❌ Events routes failed', 'red');
    log(`   Error: ${err.response?.data?.error || err.message}`, 'red');
    return { success: false };
  }
}

// Test Bookings Routes
async function testBookingsRoutes(token, eventId) {
  logSection('Testing Bookings Routes');
  
  if (!token) {
    log('⚠️  Skipping bookings test - no auth token available', 'yellow');
    return { success: false };
  }

  if (!eventId) {
    log('⚠️  Skipping bookings test - no events available', 'yellow');
    return { success: false };
  }

  try {
    // Test Create Booking
    log('Testing POST /api/bookings...', 'yellow');
    const bookingRes = await axios.post(
      `${BACKEND_URL}/api/bookings`,
      { event_id: eventId, seats: 2 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    log('✅ Create booking endpoint working', 'green');
    log(`   Booking ID: ${bookingRes.data._id}`, 'blue');
    log(`   Seats booked: ${bookingRes.data.seats}`, 'blue');

    // Test Get My Bookings
    log('\nTesting GET /api/bookings/me...', 'yellow');
    const myBookingsRes = await axios.get(`${BACKEND_URL}/api/bookings/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    log('✅ Get my bookings endpoint working', 'green');
    log(`   Found ${myBookingsRes.data.length} booking(s)`, 'blue');

    return { success: true };
  } catch (err) {
    log('❌ Bookings routes failed', 'red');
    log(`   Error: ${err.response?.data?.error || err.message}`, 'red');
    return { success: false };
  }
}

// Test Database Models
async function testDatabaseModels() {
  logSection('Testing Database Models');
  
  try {
    const User = require('./models/user');
    const Event = require('./models/event');
    const Booking = require('./models/booking');

    // Count documents
    const userCount = await User.countDocuments();
    const eventCount = await Event.countDocuments();
    const bookingCount = await Booking.countDocuments();

    log('✅ Database models loaded successfully', 'green');
    log(`   Users: ${userCount}`, 'blue');
    log(`   Events: ${eventCount}`, 'blue');
    log(`   Bookings: ${bookingCount}`, 'blue');

    return true;
  } catch (err) {
    log('❌ Database models test failed', 'red');
    log(`   Error: ${err.message}`, 'red');
    return false;
  }
}

// Main test runner
async function runAllTests() {
  log('\n🚀 Starting Backend Connection Tests', 'cyan');
  log(`   Backend URL: ${BACKEND_URL}`, 'blue');
  log(`   MongoDB URI: ${MONGO_URI}`, 'blue');
  
  const results = {
    mongo: false,
    server: false,
    auth: false,
    events: false,
    bookings: false,
    models: false
  };

  // Test MongoDB
  results.mongo = await testMongoConnection();
  
  if (!results.mongo) {
    log('\n⚠️  MongoDB connection failed. Cannot proceed with other tests.', 'yellow');
    log('   Please check your MongoDB connection and try again.', 'yellow');
    await cleanup();
    return;
  }

  // Test Database Models
  results.models = await testDatabaseModels();

  // Test Backend Server
  results.server = await testBackendServer();
  
  if (!results.server) {
    log('\n⚠️  Backend server is not running. Cannot test API endpoints.', 'yellow');
    log('   Start the server with: npm run dev', 'yellow');
    await cleanup();
    return;
  }

  // Test Auth Routes
  const authResult = await testAuthRoutes();
  results.auth = authResult.success;

  // Test Events Routes
  const eventsResult = await testEventsRoutes();
  results.events = eventsResult.success;

  // Test Bookings Routes
  const bookingsResult = await testBookingsRoutes(authResult.token, eventsResult.eventId);
  results.bookings = bookingsResult.success;

  // Summary
  logSection('Test Summary');
  const tests = [
    { name: 'MongoDB Connection', status: results.mongo },
    { name: 'Database Models', status: results.models },
    { name: 'Backend Server', status: results.server },
    { name: 'Auth Routes', status: results.auth },
    { name: 'Events Routes', status: results.events },
    { name: 'Bookings Routes', status: results.bookings }
  ];

  tests.forEach(test => {
    const status = test.status ? '✅ PASS' : '❌ FAIL';
    const color = test.status ? 'green' : 'red';
    log(`${status} - ${test.name}`, color);
  });

  const passedTests = tests.filter(t => t.status).length;
  const totalTests = tests.length;
  
  log(`\nTotal: ${passedTests}/${totalTests} tests passed`, passedTests === totalTests ? 'green' : 'yellow');

  await cleanup();
}

async function cleanup() {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    log('\n🔌 MongoDB connection closed', 'blue');
  }
}

// Run tests
runAllTests().catch(err => {
  log('\n💥 Unexpected error occurred:', 'red');
  log(err.stack, 'red');
  cleanup();
});
