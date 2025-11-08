# 🚀 Task Manager - MERN Stack Application

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js) and deployed using modern DevOps practices.

## 📖 Assignment Overview
This project fulfills the requirements for **Week 7: Deployment and DevOps Essentials** - Launching Your MERN App.

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS v4** for styling
- **React Router DOM** for routing
- **Axios** for API calls
- **Context API** for state management

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** for database
- **Mongoose** for ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Deployment & DevOps
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Database hosting
- **GitHub Actions** - CI/CD pipeline
- **Environment Variables** - Configuration management

## 🚀 Live Deployment

### Frontend Application
**URL:** [https://your-task-manager-frontend.vercel.app](https://your-task-manager-frontend.vercel.app)

### Backend API
**URL:** [https://your-task-manager-backend.onrender.com](https://your-task-manager-backend.onrender.com)

### API Health Check
**Endpoint:** `GET /api/health`  
**Response:** 
```json
{
  "success": true,
  "status": "OK",
  "database": "Connected",
  "environment": "production",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
📁 Project Structure
text
task-manager-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
├── .github/workflows/
│   └── deploy.yml
└── README.md
🎯 Features Implemented
✅ User Authentication
User registration and login

JWT-based authentication

Protected routes

Password hashing with bcrypt

✅ Task Management
Create new tasks

Read all tasks (user-specific)

Update task status and details

Delete tasks

Task filtering by status

Priority levels (Low, Medium, High)

✅ UI/UX
Responsive design

Modern Tailwind CSS styling

Loading states

Error handling

Form validation

🔧 Installation & Local Development
Prerequisites
Node.js (v16 or higher)

MongoDB Atlas account

Git

Backend Setup
bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB Atlas connection string

npm run dev
# Server runs on http://localhost:5000
Frontend Setup
bash
cd frontend
npm install

# Create .env file
cp .env.example .env

npm run dev
# App runs on http://localhost:5173
🌐 Environment Variables
Backend (.env)
env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secure_jwt_secret
JWT_EXPIRE=30d
FRONTEND_URL=https://your-frontend-domain.vercel.app
Frontend (.env)
env
VITE_API_URL=http://localhost:5000/api  # Development
VITE_API_URL=https://your-backend.onrender.com/api  # Production
VITE_APP_NAME=Task Manager
📊 API Endpoints
Authentication
POST /api/auth/register - User registration

POST /api/auth/login - User login

GET /api/auth/me - Get current user

Tasks
GET /api/tasks - Get all user tasks

POST /api/tasks - Create new task

PUT /api/tasks/:id - Update task

DELETE /api/tasks/:id - Delete task

🚀 Deployment Process
Task 1: Application Preparation ✅
Optimized React application for production

Implemented code splitting and performance optimizations

Configured environment variables for different environments

Set up secure Express.js backend with proper error handling

Implemented MongoDB Atlas with connection pooling

Task 2: Backend Deployment ✅
Deployed Express.js backend to Render

Configured environment variables

Set up continuous deployment from GitHub

Implemented HTTPS with SSL/TLS certificate

Configured server monitoring and logging

Task 3: Frontend Deployment ✅
Deployed React frontend to Vercel

Configured build settings and environment variables

Set up continuous deployment from GitHub

Implemented HTTPS and caching strategies

Task 4: CI/CD Pipeline ✅
Set up GitHub Actions for continuous integration

Configured automated testing and linting

Implemented automatic deployment on successful builds

Set up staging and production environments

Task 5: Monitoring and Maintenance ✅
Implemented health check endpoints

Set up uptime monitoring

Configured error tracking

Created deployment and rollback procedures

🔍 Monitoring Setup
Health Checks
Backend: GET /api/health

Frontend: Built-in Vercel analytics

Performance Monitoring
Frontend: Vercel Analytics

Backend: Render metrics and logs

Database: MongoDB Atlas monitoring


🛡️ Security Features
JWT authentication with secure tokens

Password hashing with bcrypt

CORS configuration

Environment variable protection

HTTPS enforcement

Input validation and sanitization

📝 Assignment Requirements Checklist
Fully deployed MERN stack application

Continuous integration and deployment pipelines

Proper environment configuration

Monitoring and logging setup

Documentation of deployment process

Backend API deployed and accessible

Frontend application deployed and accessible

MongoDB Atlas database configured

Environment variables properly set up

HTTPS implemented for both frontend and backend

🔮 Future Enhancements
Task categories and tags

File attachments for tasks

Real-time notifications

Team collaboration features

Advanced filtering and search

Task templates

Mobile app version

👨‍💻 Developer
Glory Mukami

GitHub: @mukamiglory93

Email: glorymukami@example.com

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

