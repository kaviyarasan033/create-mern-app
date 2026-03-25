const { getFirebaseConfig, isFirebaseEnabled } = require('../config/firebase');
const { buildMongoUri, isMongoEnabled } = require('../config/db');
const { getMySqlConfig, isMySqlEnabled } = require('../config/mysql');

function printStatus(label, ok, detail) {
  const symbol = ok ? 'OK' : 'WARN';
  console.log(`[${symbol}] ${label} - ${detail}`);
}

function checkMongo() {
  if (!isMongoEnabled()) {
    printStatus('MongoDB', true, 'disabled for this server setup');
    return;
  }

  try {
    const mongoUri = buildMongoUri();
    printStatus('MongoDB', Boolean(mongoUri), mongoUri ? 'server env is ready' : 'set DB_MONGO_URI or DB_MONGO_URL + DB_MONGO_DATABASE');
  } catch (error) {
    printStatus('MongoDB', false, error.message);
  }
}

function checkMySql() {
  if (!isMySqlEnabled()) {
    printStatus('MySQL', true, 'optional integration is disabled');
    return;
  }

  const config = getMySqlConfig();
  const ready = Boolean(config.host && config.user && config.database);
  printStatus('MySQL', ready, ready ? 'server env is ready' : 'set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DATABASE');
}

function checkFirebase() {
  if (!isFirebaseEnabled()) {
    printStatus('Firebase Admin', true, 'optional integration is disabled');
    return;
  }

  const config = getFirebaseConfig();
  const ready = Boolean(config.projectId && config.clientEmail && config.privateKey);
  printStatus('Firebase Admin', ready, ready ? 'server env is ready' : 'set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY');
}

console.log('Server setup check');
console.log('Use this before npm run dev or npm run mern:start.');
console.log('');
checkMongo();
checkMySql();
checkFirebase();
