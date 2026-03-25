const mongoose = require('mongoose');

const dbCheck = (req, res, next) => {
  const connection = process.env.DB_CONNECTION || 'mongodb';

  if (connection === 'mongodb' && mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database connection is still being established. Please try again in a moment.'
    });
  }
  next();
};

module.exports = dbCheck;
