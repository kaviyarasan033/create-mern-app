const mongoose = require('mongoose');

const dbCheck = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      error: 'Database Configuration Error',
      message: 'Please check your .env file and ensure MongoDB is running.'
    });
  }
  next();
};

module.exports = dbCheck;
