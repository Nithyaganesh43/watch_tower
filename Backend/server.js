require('dotenv').config();
const express = require('express');
const connectToDb = require('./src/config/database');
const authRoutes = require('./src/routes/auth');
const serverRoutes = require('./src/routes/servers');
const serverInit = require('./src/routes/serverInit');
const { rateLimiter } = require('./src/middleware/rateLimiter');
require('./pingping');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(serverInit);

// Rate limiters
const authRateLimiter = rateLimiter(50, 5 * 60 * 1000);
const serverRateLimiter = rateLimiter(50, 5 * 60 * 1000);

// Routes
app.use('/auth', authRateLimiter, authRoutes);
app.use('/servers', serverRateLimiter, serverRoutes);

// 404 / catch-all
app.use('*', (req, res) => {
  res.status(200).json({ message: 'Welcome to Watchtower API' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

// Start server after DB connection
connectToDb()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Watchtower server running on port ${PORT}`)
    );
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
