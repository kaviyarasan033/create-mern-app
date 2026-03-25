const logger = require('./logger');

function isFirebaseEnabled() {
  return process.env.FIREBASE_ENABLED === 'true';
}

function getFirebaseConfig() {
  return {
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
    databaseURL: process.env.FIREBASE_DATABASE_URL || ''
  };
}

function hasRequiredFirebaseConfig(config) {
  return Boolean(config.projectId && config.clientEmail && config.privateKey);
}

function initializeFirebase() {
  if (!isFirebaseEnabled()) {
    return null;
  }

  const config = getFirebaseConfig();

  if (!hasRequiredFirebaseConfig(config)) {
    logger.warn('Firebase is enabled but required server env values are missing. Skipping Firebase Admin initialization.');
    return null;
  }

  let admin;

  try {
    admin = require('firebase-admin');
  } catch (error) {
    logger.warn(`firebase-admin is not available: ${error.message}`);
    return null;
  }

  if (admin.apps.length) {
    return admin.app();
  }

  const options = {
    credential: admin.credential.cert({
      projectId: config.projectId,
      clientEmail: config.clientEmail,
      privateKey: config.privateKey
    })
  };

  if (config.storageBucket) {
    options.storageBucket = config.storageBucket;
  }

  if (config.databaseURL) {
    options.databaseURL = config.databaseURL;
  }

  const app = admin.initializeApp(options);
  logger.info('Firebase Admin initialized');
  return app;
}

module.exports = {
  getFirebaseConfig,
  initializeFirebase,
  isFirebaseEnabled
};
