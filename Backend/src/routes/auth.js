const express = require('express');
const { rateLimiter } = require('../middleware/rateLimiter');
const router = express.Router();

const authenticateRateLimiter = rateLimiter(1000, 5 * 60 * 1000);
const checkRateLimiter = rateLimiter(10000, 5 * 60 * 1000);
 
//google callback 

router.get('/check', checkRateLimiter, async (req, res) => {
  try { 

  } catch (error) {
    
  }
});

// Logout
router.post('/logout',   async (req, res) => {
  try {
   
  } catch (error) { 
  }
});

module.exports = router;

// User {
//   email: String (max 100 chars, email format)
//   fullName: String (max 50 chars)
//   createdAt: Date
//   updatedAt: Date
// }

// Server {
//   userEmail: String (max 100 chars)
//   url: String (max 200 chars)
//   status: Enum ['online','offline','checking']
//   responseTime: Number
//   lastCheck: Date
//   consecutiveFailures: Number
//   createdAt: Date
//   updatedAt: Date
// }
