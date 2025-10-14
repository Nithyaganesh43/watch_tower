const { verifyToken } = require('../utils/cookie'); 
const { User } = require('../models/Model');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.watchtower_token;
    if (!token)
      return res
        .status(401)
        .json({ authorized: false, message: 'No token found' });

    const decoded = verifyToken(token);
    if (!decoded)
      return res
        .status(403)
        .json({ authorized: false, message: 'Invalid or expired token' });

    const user = await User.findOne({ email: decoded.email });
    if (!user)
      return res
        .status(404)
        .json({ authorized: false, message: 'User not found' });

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in auth middleware:', error);
    return res
      .status(500)
      .json({ authorized: false, message: 'Internal Server Error' });
  }
};

module.exports = { auth };
