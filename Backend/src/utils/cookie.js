const jwt = require('jsonwebtoken');

const JWT_SECRET = 'watchtower_secret_key';
const JWT_EXPIRES_IN = '7d';  

exports.getToken = (payload) => {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  } catch (err) {
    console.error('Error generating token:', err);
    return null;
  }
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error('Invalid or expired token:', err.message);
    return null;
  }
};
