const express = require('express');
const Server = require('../models/Server'); 
const User = require('../models/User'); 
const {rateLimiter} = require('../middleware/rateLimiter');
const router = express.Router();
const globalRateLimiter = rateLimiter(500, 5 * 60 * 1000);
// Add new server
router.get('/currentTotal',globalRateLimiter, async (req, res) => {
  try {
   const totalServers = await Server.countDocuments();
   const totalUsers = await User.countDocuments(); 
    res.status(200).json({
      totalServers,
      totalUsers,
    });
  } catch (error) {
    console.error('Server creation error:', error);
    res.status(500).json({ error: 'Failed to add server. Please try again.' });
  }
});
 

module.exports = router;