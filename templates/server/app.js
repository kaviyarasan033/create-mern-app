const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorMiddleware');
const dbCheck = require('./middleware/dbCheck');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Enterprise API is running...'));

// Database Health Check
app.use('/api', dbCheck);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', apiRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
