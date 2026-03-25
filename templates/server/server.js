const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

dotenvExpand.expand(dotenv.config());
const app = require('./app');
const connectDB = require('./config/db');
const { initializeFirebase } = require('./config/firebase');
const logger = require('./config/logger');
const { getMySqlPool } = require('./config/mysql');

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  await getMySqlPool();
  initializeFirebase();

  app.listen(PORT, () => {
    logger.info(`✓ Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
})();
