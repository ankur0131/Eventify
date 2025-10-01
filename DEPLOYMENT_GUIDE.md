# 🚀 Eventify Deployment Guide

This guide will walk you through deploying your Eventify MERN stack application to various platforms.

## 📋 Prerequisites

- ✅ Environment files created (`.env` in both `bakend/` and `Frontend/`)
- ✅ Dependencies installed (`npm install` completed)
- ✅ MongoDB connection configured
- ✅ Git repository set up

## 🌐 Deployment Options

### Option 1: Railway (Recommended - Easy & Free)

#### Backend Deployment:
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `eventify` repository
5. Choose the `bakend` folder as the root directory
6. Set environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong secret key
   - `NODE_ENV`: production
   - `PORT`: (auto-set by Railway)

#### Frontend Deployment:
1. In Railway, create another project
2. Deploy from the same GitHub repo
3. Choose the `Frontend` folder as root
4. Set environment variable:
   - `REACT_APP_API_URL`: Your backend Railway URL + `/api`

### Option 2: Vercel (Frontend) + Railway (Backend)

#### Backend (Railway):
- Follow the backend steps above

#### Frontend (Vercel):
1. Go to [Vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `Frontend`
4. Add environment variable:
   - `REACT_APP_API_URL`: Your backend URL + `/api`
5. Deploy

### Option 3: Heroku (Both)

#### Backend:
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create eventify-backend`
4. Set environment variables:
   ```bash
   heroku config:set MONGO_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_secret
   heroku config:set NODE_ENV=production
   ```
5. Deploy: `git subtree push --prefix=bakend heroku main`

#### Frontend:
1. Create another Heroku app: `heroku create eventify-frontend`
2. Set environment variable:
   ```bash
   heroku config:set REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
   ```
3. Deploy: `git subtree push --prefix=Frontend heroku main`

## 🗄️ Database Setup

### MongoDB Atlas (Recommended):
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGO_URI` in your deployment environment

### Local MongoDB:
- Use the connection string: `mongodb://localhost:27017/eventify`

## 🔧 Environment Variables

### Backend (.env):
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/eventify
JWT_SECRET=your_super_secret_jwt_key_here
PORT=4000
NODE_ENV=production
```

### Frontend (.env):
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## 📝 Step-by-Step Deployment

### Step 1: Deploy Backend
1. Choose your platform (Railway recommended)
2. Connect your GitHub repository
3. Set the root directory to `bakend`
4. Configure environment variables
5. Deploy and get your backend URL

### Step 2: Update Frontend API URL
1. Copy your backend URL
2. Update `REACT_APP_API_URL` in frontend environment
3. Deploy frontend to your chosen platform

### Step 3: Seed Database
1. After backend deployment, run the seeding script:
   ```bash
   cd bakend
   npm run seed
   ```

### Step 4: Test Deployment
1. Visit your frontend URL
2. Test event listing
3. Test user registration/login
4. Test event booking

## 🐳 Docker Deployment (Alternative)

If you prefer Docker:

```bash
# Build and run with docker-compose
docker-compose up --build

# Or deploy individual services
cd bakend && docker build -t eventify-backend .
cd ../Frontend && docker build -t eventify-frontend .
```

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure your backend allows your frontend domain
2. **Environment Variables**: Double-check all environment variables are set
3. **Database Connection**: Verify MongoDB URI is correct
4. **Build Failures**: Check for missing dependencies

### Debug Commands:
```bash
# Check backend logs
railway logs

# Test backend locally
cd bakend && npm start

# Test frontend locally
cd Frontend && npm run dev
```

## 📊 Monitoring

After deployment:
- Monitor your application logs
- Set up error tracking (Sentry)
- Monitor database performance
- Set up uptime monitoring

## 🎉 Success!

Once deployed, your Eventify app will be live and accessible to users worldwide!

### Your URLs will be:
- Frontend: `https://your-frontend-domain.com`
- Backend API: `https://your-backend-domain.com/api`
- Database: MongoDB Atlas cluster

---

**Need Help?** Check the main README.md for additional setup instructions.
