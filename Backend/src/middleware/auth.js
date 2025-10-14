const jwt = require('jsonwebtoken'); 

const authenticateToken = async (req, res, next) => {
  try {
   
    next();
  } catch (error) {
     
  }
};

module.exports = { authenticateToken };
