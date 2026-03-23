const mongoose = require('mongoose');

const dbCheck = (req, res, next) => {
  if (process.env.DB_CONNECTION === 'mongodb' && mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database connection is still being established. Please try again in a moment.'
    });
  }
  next();
};

module.exports = dbCheck;
