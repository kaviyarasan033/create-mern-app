const mongoose = require('mongoose');
const logger = require('./logger');

function buildMongoUri() {
  const configuredUri = process.env.MONGODB_URI;

  if (configuredUri) {
    return configuredUri;
  }

  const host = process.env.DB_MONGO_HOST || '127.0.0.1';
  const port = process.env.DB_MONGO_PORT || '27017';
  const database = process.env.DB_MONGO_DATABASE || 'mern_mvc_starter';
  const username = process.env.DB_MONGO_USERNAME || '';
  const password = process.env.DB_MONGO_PASSWORD || '';
  const authDatabase = process.env.DB_MONGO_AUTH_DATABASE || 'admin';

  const hasUsername = username.trim() !== '';
  const hasPassword = password.trim() !== '';
  const credentials = hasUsername
    ? `${encodeURIComponent(username)}${hasPassword ? `:${encodeURIComponent(password)}` : ''}@`
    : '';
  const query = hasUsername ? `?authSource=${encodeURIComponent(authDatabase)}` : '';

  return `mongodb://${credentials}${host}:${port}/${database}${query}`;
}

const connectDB = async () => {
  const dbType = process.env.DB_CONNECTION || 'mongodb';

  if (dbType === 'mongodb') {
    try {
      const mongoUri = buildMongoUri();
      await mongoose.connect(mongoUri);
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
