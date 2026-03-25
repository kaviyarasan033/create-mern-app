const { initializeFirebase } = require('../config/firebase');

module.exports = async function(req, res, next) {
  const firebaseToken = req.header('Authorization')?.replace('Bearer ', '') || req.body.firebaseToken;
  
  if (!firebaseToken) {
    return res.status(401).json({ success: false, message: 'Firebase token required' });
  }
  
  try {
    const firebaseApp = initializeFirebase();
    
    if (!firebaseApp) {
      return res.status(500).json({ success: false, message: 'Firebase not configured' });
    }
    
    const admin = require('firebase-admin');
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    
    req.firebaseUser = decodedToken;
    next();
    
  } catch (error) {
    console.error('Firebase token verification error:', error);
    return res.status(401).json({ success: false, message: 'Invalid Firebase token' });
  }
};