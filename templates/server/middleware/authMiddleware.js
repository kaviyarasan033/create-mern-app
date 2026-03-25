const jwt = require('jsonwebtoken');

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  let token = req.header('Authorization');
  
  // Extract token from Bearer header
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  
  // Fallback to x-auth-token for backward compatibility
  if (!token) {
    token = req.header('x-auth-token');
  }
  
  if (!token) return res.status(401).json({ success: false, message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    return res.status(401).json({ success: false, message: 'Token verification failed' });
  }
};
