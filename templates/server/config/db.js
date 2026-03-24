const mongoose = require('mongoose');
const logger = require('./logger');

function buildMongoUri() {
  const url = process.env.DB_MONGO_URL;
  const database = process.env.DB_MONGO_DATABASE;
  const username = process.env.DB_MONGO_USERNAME || '';
  const password = process.env.DB_MONGO_PASSWORD || '';

  if (!url) {
    throw new Error('DB_MONGO_URL is missing in .env');
  }

  if (!database) {
    throw new Error('DB_MONGO_DATABASE is missing in .env');
  }

  if (!username) {
    throw new Error('DB_MONGO_USERNAME is missing in .env');
  }

  if (!password) {
    throw new Error('DB_MONGO_PASSWORD is missing in .env');
  }

  const normalizedUrl = url.endsWith('/') ? url : `${url}/`;
  const encodedUsername = encodeURIComponent(username);
  const encodedPassword = encodeURIComponent(password);
  const credentials = `${encodedUsername}:${encodedPassword}@`;

  return normalizedUrl.replace('://', `://${credentials}`) + database;
}

const connectDB = async () => {
  try {
    const mongoUri = buildMongoUri();
    await mongoose.connect(mongoUri);
    logger.info('MongoDB Connected');
  } catch (err) {
    logger.error(`MongoDB Connection Error: ${err.message}`);
  }
};

module.exports = connectDB;
