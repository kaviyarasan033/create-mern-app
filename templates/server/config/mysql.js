const logger = require('./logger');

let pool;

function isMySqlEnabled() {
  return process.env.MYSQL_ENABLED === 'true';
}

function getMySqlConfig() {
  return {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || '',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || '',
    waitForConnections: true,
    connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 10),
    queueLimit: 0
  };
}

function hasRequiredMySqlConfig(config) {
  return Boolean(config.host && config.user && config.database);
}

async function getMySqlPool() {
  if (!isMySqlEnabled()) {
    return null;
  }

  if (pool) {
    return pool;
  }

  const config = getMySqlConfig();

  if (!hasRequiredMySqlConfig(config)) {
    logger.warn('MySQL is enabled but required server env values are missing. Skipping MySQL initialization.');
    return null;
  }

  let mysql;

  try {
    mysql = require('mysql2/promise');
  } catch (error) {
    logger.warn(`mysql2 is not available: ${error.message}`);
    return null;
  }

  pool = mysql.createPool(config);

  try {
    const connection = await pool.getConnection();
    connection.release();
    if (process.env.APP_DEBUG === 'true') {
      logger.info(`MySQL Connected: ${config.host}:${config.port}/${config.database}`);
    } else {
      logger.info('MySQL initialized successfully');
    }
  } catch (error) {
    logger.error(`MySQL connection failed: ${error.message}`);
    if (process.env.APP_DEBUG === 'true') {
      logger.error(error.stack);
    }
  }

  return pool;
}

module.exports = {
  getMySqlConfig,
  getMySqlPool,
  isMySqlEnabled
};
