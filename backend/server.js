import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

// Load env vars
dotenv.config();

const app = express();

// Security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// CORS - Configure for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Task Manager API is running!',
    environment: process.env.NODE_ENV,
    database: 'MERN-7',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    environment: process.env.NODE_ENV,
    databaseName: 'MERN-7',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// MongoDB connection with better error handling
const connectDB = async () => {
  try {
    console.log('🔗 Connecting to MongoDB Atlas...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.log('💡 Please check:');
    console.log('   - Your Atlas connection string in .env');
    console.log('   - Internet connection');
    console.log('   - Atlas IP whitelist settings');
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Use error handler (must be after routes)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    
    const server = app.listen(PORT, () => {
      console.log(`\n🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      console.log(`📍 API URL: http://localhost:${PORT}`);
      console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
      console.log(`🔐 Auth routes: http://localhost:${PORT}/api/auth`);
      console.log(`📝 Task routes: http://localhost:${PORT}/api/tasks`);
      console.log('Press Ctrl+C to stop the server\n');
    });

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n👋 Received SIGINT. Shutting down gracefully...');
      server.close(() => {
        console.log('💤 HTTP server closed.');
      });
      await mongoose.connection.close();
      console.log('📦 MongoDB connection closed.');
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\n👋 Received SIGTERM. Shutting down gracefully...');
      server.close(() => {
        console.log('💤 HTTP server closed.');
      });
      await mongoose.connection.close();
      console.log('📦 MongoDB connection closed.');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;