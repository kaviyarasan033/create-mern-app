const mongoose = require('mongoose');
const logger = require('./logger');

function buildMongoUri() {
  const directUri = process.env.DB_MONGO_URI;
  const url = process.env.DB_MONGO_URL;
  const database = process.env.DB_MONGO_DATABASE;
  const username = process.env.DB_MONGO_USERNAME || '';
  const password = process.env.DB_MONGO_PASSWORD || '';

  if (directUri) {
    return directUri;
  }

  if (!url) {
    throw new Error('DB_MONGO_URL is missing in .env');
  }

  if (!database) {
    throw new Error('DB_MONGO_DATABASE is missing in .env');
  }

  const normalizedUrl = url.endsWith('/') ? url : `${url}/`;

  if (!username && !password) {
    return normalizedUrl + database;
  }

  if (!username || !password) {
    throw new Error('DB_MONGO_USERNAME and DB_MONGO_PASSWORD must both be set when using authenticated MongoDB');
  }

  const encodedUsername = encodeURIComponent(username);
  const encodedPassword = encodeURIComponent(password);
  const credentials = `${encodedUsername}:${encodedPassword}@`;

  return normalizedUrl.replace('://', `://${credentials}`) + database;
}

function isMongoEnabled() {
  return (process.env.DB_CONNECTION || 'mongodb') === 'mongodb';
}

const connectDB = async () => {
  if (!isMongoEnabled()) {
    logger.info('MongoDB connection skipped because DB_CONNECTION is not mongodb');
    return false;
  }

  try {
    const mongoUri = buildMongoUri();
    await mongoose.connect(mongoUri);
    logger.info('MongoDB Connected');
    return true;
  } catch (err) {
    logger.error(`MongoDB Connection Error: ${err.message}`);
    return false;
  }
};

module.exports = connectDB;
module.exports.buildMongoUri = buildMongoUri;
module.exports.isMongoEnabled = isMongoEnabled;
