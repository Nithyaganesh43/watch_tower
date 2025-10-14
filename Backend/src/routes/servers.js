const express = require('express');
const mongoose = require('mongoose');
const { Server } = require('../models/Model');
const { auth } = require('../middleware/auth');
const { validateUrl } = require('../utils/validation');

const router = express.Router();



const API_KEY = 'admin12345';

router.get('/getall', async (req, res) => {
  try {
    const key = req.query.API_KEY;
    if (key !== API_KEY)
      return res.status(403).json({ error: 'Invalid API_KEY' });

    const servers = await Server.find().sort({ createdAt: 1 });

    const formattedServers = servers.map(({ _id, url }) => ({
      id: _id,
      url,
    }));

    res.json({ servers: formattedServers });
  } catch (error) {
    console.error('Server data fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch server data' });
  }
});

router.post('/reportallservers', async (req, res) => {
  try {
    const key = req.query.API_KEY || req.headers['x-api-key'];
    if (key !== API_KEY)
      return res.status(403).json({ error: 'Invalid API_KEY' });

    let { report } = req.body;
    if (!report || !Array.isArray(report.failed))
      return res.status(400).json({ error: 'Invalid report format' });

    const now = new Date();

    await Server.updateMany(
      {
        _id: {
          $in: report.failed.map((id) => new mongoose.Types.ObjectId(id)),
        },
      },
      { $set: { status: 'offline', lastCheck: now } }
    );

    await Server.updateMany(
      {
        _id: {
          $nin: report.failed.map((id) => new mongoose.Types.ObjectId(id)),
        },
      },
      { $set: { status: 'online', lastCheck: now } }
    );

    res.json({ message: 'Server statuses updated successfully' });
  } catch (error) {
    console.error('Server report update error:', error);
    res.status(500).json({ error: 'Failed to update server statuses' });
  }
});


router.use(auth);

// Add new server
router.post('/add', async (req, res) => {
  try {
    const { NewUrl } = req.body;
    if (!NewUrl) return res.status(400).json({ error: 'URL is required' });

    const urlValidation = validateUrl(NewUrl);
    if (!urlValidation.valid)
      return res.status(400).json({ error: urlValidation.error });

    const normalizedUrl = urlValidation.normalizedUrl;

    const existingServer = await Server.findOne({
      email: req.user.email,
      url: normalizedUrl,
    });
    if (existingServer)
      return res
        .status(400)
        .json({ error: 'This URL is already being monitored by you.' });

    const serverCount = await Server.countDocuments({ email: req.user.email });
    if (serverCount >= 100)
      return res
        .status(400)
        .json({ error: 'Maximum server limit 100 reached.' });

    const server = new Server({ email: req.user.email, url: normalizedUrl });
    await server.save();

    const {
      _id,
      url: serverUrl,
      status,
      lastCheck,
      createdAt,
    } = server;

    res.status(201).json({
      message: 'Server added successfully',
      server: {
        id: _id,
        url: serverUrl,
        status,
        lastCheck,
        createdAt,
        
      },
    });
  } catch (error) {
    console.error('Server creation error:', error);
    res.status(500).json({ error: 'Failed to add server. Please try again.' });
  }
});

// Get all servers
router.get('/', async (req, res) => {
  try {
    const servers = await Server.find({ email: req.user.email }).sort({
      createdAt: 1,
    });

    const formattedServers = servers.map(
      ({ _id, url, status, lastCheck, createdAt, updatedAt }) => ({
        id: _id,
        url,
        status,
        lastCheck,
        createdAt,
        
      })
    );

    res.json({ servers: formattedServers });
  } catch (error) {
    console.error('Server data fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch server data' });
  }
});

// Remove server
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: 'Invalid server ID format' });

    const deletedServer = await Server.findOneAndDelete({
      _id: id,
      email: req.user.email,
    });
    if (!deletedServer)
      return res.status(404).json({ error: 'Server not found' });

    const { _id, url, status, lastCheck } = deletedServer;

    res.json({
      message: 'Server removed successfully',
      server: { id: _id, url, status, lastCheck },
    });
  } catch (error) {
    console.error('Server deletion error:', error);
    res.status(500).json({ error: 'Failed to remove server' });
  }
});



module.exports = router;

//Esp routes - not frontend 
// 1. GET /getall?API_KEY=... – fetch all servers

// Request:

// GET /monitor/getall?API_KEY=api_key


// Response:

// {
//   "servers": [
//     {
//       "id": "650d4f2f1c4a1b00123abcd1",
//       "url": "https://example.com"
//     },
//     {
//       "id": "650d4f2f1c4a1b00123abcd2",
//       "url": "https://another.com"
//     }
//   ]
// }


// If the API_KEY is wrong:

// {
//   "error": "Invalid API_KEY"
// }

// 2. POST /reportallservers?API_KEY=... – report server status

// Request:

// POST /monitor/reportallservers?API_KEY=api_key
// Content-Type: application/json

// {
//   "report": {
//     "failed": [
//       "650d4f2f1c4a1b00123abcd2",
//       "650d4f2f1c4a1b00123abcd5"
//     ]
//   }
// }


// Explanation:

// failed contains only the IDs of servers that are offline.

// All other servers will automatically be marked online.

// Response:

// {
//   "message": "Server statuses updated successfully"
// }


// If the API_KEY is missing or invalid:

// {
//   "error": "Invalid API_KEY"
// }


// If the request body is malformed:

// {
//   "error": "Invalid report format"
// }





//frontend route



// POST /add – add a new server

// {
//   "message": "Server added successfully",
//   "server": {
//     "id": "60f6c2f8b6d9c1001c8a1234",
//     "url": "https://example.com",
//     "status": "checking",
//     "lastCheck": "2025-10-14T07:00:00.000Z",
//     "createdAt": "2025-10-14T07:00:00.000Z",
//     "updatedAt": "2025-10-14T07:00:00.000Z"
//   }
// }

// GET / – fetch all servers

// {
//   "servers": [
//     {
//       "id": "60f6c2f8b6d9c1001c8a1234",
//       "url": "https://example.com",
//       "status": "online",
//       "lastCheck": "2025-10-14T07:00:00.000Z",
//       "createdAt": "2025-10-14T07:00:00.000Z",
//       "updatedAt": "2025-10-14T07:00:00.000Z"
//     },
//     {
//       "id": "60f6c2f8b6d9c1001c8a1235",
//       "url": "https://another.com",
//       "status": "offline",
//       "lastCheck": "2025-10-14T07:10:00.000Z",
//       "createdAt": "2025-10-14T07:05:00.000Z",
//       "updatedAt": "2025-10-14T07:05:00.000Z"
//     }
//   ]
// }

// DELETE /:id – remove a server

// {
//   "message": "Server removed successfully",
//   "server": {
//     "id": "60f6c2f8b6d9c1001c8a1234",
//     "url": "https://example.com",
//     "status": "online",
//     "lastCheck": "2025-10-14T07:00:00.000Z"
//   }
// }
