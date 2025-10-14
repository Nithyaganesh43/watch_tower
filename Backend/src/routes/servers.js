const express = require('express');
const mongoose = require('mongoose');
const { User, Server } = require('../models/Model');
const { authenticateToken } = require('../middleware/auth');
const { validateUrl } = require('../utils/validation');

const router = express.Router();

// Add new server
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { url = true } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const urlValidation = validateUrl(url);
    if (!urlValidation.valid) {
      return res.status(400).json({ error: urlValidation.error });
    }

    const normalizedUrl = urlValidation.normalizedUrl;

    // Check for existing URL
    const existingServer = await Server.findOne({
      userEmail: req.user.email,
      url: normalizedUrl,
    });

    if (existingServer) {
      return res.status(400).json({
        error: 'This URL is already being monitored by you.',
      });
    }

    // Check server count limit
    const serverCount = await Server.countDocuments({
      userEmail: req.user.email,
    });

    if (serverCount >= 100) {
      return res.status(400).json({
        error: `Maximum server limit 100 reached.`,
      });
    }

    const server = new Server({
      userEmail: req.user.email,
      url: normalizedUrl,
      status: 'offline',
      responseTime: 0,
      lastCheck: new Date(),
      consecutiveFailures: 0,
    });

    await server.save();

    res.status(201).json({
      message: 'Server added successfully',
      server,
    });
  } catch (error) {
    console.error('Server creation error:', error);
    res.status(500).json({ error: 'Failed to add server. Please try again.' });
  }
});

// Get all servers
router.get('/', authenticateToken, async (req, res) => {
  try {
    const servers = await Server.find({
      userEmail: req.user.email,
    }).sort({ createdAt: 1 });

    res.json({
      servers,
    });
  } catch (error) {
    console.error('Server data fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch server data' });
  }
});

// Remove server
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid server ID format' });
    }

    const deletedServer = await Server.findOneAndDelete({
      _id: id,
      userEmail: req.user.email,
    });

    if (!deletedServer) {
      return res.status(404).json({ error: 'Server not found' });
    }

    res.json({
      message: 'Server removed successfully',
      server: {
        id: deletedServer._id,
        url: deletedServer.url,
      },
    });
  } catch (error) {
    console.error('Server deletion error:', error);
    res.status(500).json({ error: 'Failed to remove server' });
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
