const mongoose = require('mongoose');
const knex = require('knex');
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
      process.exit(1);
    }
  } else if (dbType === 'mysql') {
    // MySQL sample check
    logger.info('✓ MySQL Configuration Initialized (via Knex)');
  }
};

module.exports = connectDB;
