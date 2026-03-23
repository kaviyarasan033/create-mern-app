const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('mongo-sanitize');
const xss = require('xss-clean');
const errorHandler = require('./middleware/errorMiddleware');
const dbCheck = require('./middleware/dbCheck');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const app = express();

// Security Middleware
app.use(helmet()); // Set security HTTP headers
app.use(xss()); // Prevent XSS attacks
app.use((req, res, next) => {
  req.body = mongoSanitize(req.body);
  next();
});

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Standard Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Secure ProApp API is running...'));

// Database Health Check
app.use('/api', dbCheck);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', apiRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
