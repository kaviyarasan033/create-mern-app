const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  const dbType = process.env.DB_CONNECTION || 'mongodb';

  if (dbType === 'mongodb') {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.info('✓ MongoDB Connected');
    } catch (err) {
      logger.error('MongoDB Connection Error:', err);
      // Don't exit, let dbCheck middleware handle it
    }
  } else {
    logger.info(`✓ ${dbType} configuration detected.`);
  }
};

module.exports = connectDB;
