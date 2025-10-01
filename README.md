# Eventify - MERN Stack Event Booking App

A full-stack event booking application built with MongoDB, Express.js, React, and Node.js.

## Features

- 🎫 Event listing and details
- 🔐 User authentication (register/login)
- 📅 Event booking system
- 💺 Seat availability checking
- 📱 Responsive design with Tailwind CSS

## Project Structure

```
eventify/
├── bakend/          # Backend (Node.js/Express)
│   ├── config/      # Database configuration
│   ├── models/      # Mongoose models
│   ├── routes/      # API routes
│   └── server.js    # Main server file
├── Frontend/        # Frontend (React/Vite)
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── api.js       # API configuration
│   │   └── app.jsx      # Main app component
│   └── vite.config.js   # Vite configuration
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd bakend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp env.example .env
   ```

4. Update `.env` with your MongoDB connection string and JWT secret:
   ```env
   MONGO_URI=mongodb://localhost:27017/eventify
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=4000
   NODE_ENV=development
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp env.example .env
   ```

4. Update `.env` with your backend API URL:
   ```env
   REACT_APP_API_URL=http://localhost:4000/api
   ```

5. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Deployment

### Backend Deployment (Heroku/Railway/Vercel)

1. Set environment variables in your deployment platform:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong secret key
   - `NODE_ENV`: production
   - `PORT`: (usually auto-set by platform)

2. Deploy your backend code

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
   ```bash
   cd Frontend
   npm run build
   ```

2. Set environment variable:
   - `REACT_APP_API_URL`: Your deployed backend URL

3. Deploy the `dist` folder

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event (admin)

### Bookings
- `POST /api/bookings` - Create booking (requires auth)
- `GET /api/bookings/me` - Get user's bookings (requires auth)

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Database**: MongoDB

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
