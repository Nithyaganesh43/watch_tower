const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const router = express.Router();

const {rateLimiter} = require('../middleware/rateLimiter');



router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin === 'https://watchtower-24-7.vercel.app') {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
};

router.use(cors(corsOptions));
router.use(rateLimiter(500, 5 * 60 * 1000));  
router.use(express.json({ limit: '10kb' }));
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());


helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        'https://watchtower-24-7.vercel.app',
      ],
      scriptSrc: ["'self'", 'https://watchtower-24-7.vercel.app'],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
});

 
module.exports = router;
