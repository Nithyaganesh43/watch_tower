const express = require('express');
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { getToken } = require('../utils/cookie');
const { User } = require('../models/Model');
const { auth } = require('../middleware/auth');

const router = express.Router();
const FRONTEND_URL = 'https://watchtower-24-7.vercel.app';
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;

// Configure Google strategy here itself
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://thewatchtower.onrender.com/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const fullName = profile.displayName;
        done(null, { email, fullName });
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);


// Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${FRONTEND_URL}/login/failed`,
    session: false, // <-- ADD THIS LINE
  }),
  async (req, res) => {
    try {
      // The rest of your code remains the same
      const { email, fullName } = req.user;
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({ email, fullName });
        await user.save();
      }
      const token = getToken({ email, fullName });
      res.cookie('watchtower_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.redirect(FRONTEND_URL);
    } catch (err) {
      console.error('Error in Google callback:', err);
      res.redirect(`${FRONTEND_URL}/login/failed`);
    }
  }
);
 
// /check route
router.get('/check', auth, (req, res) => {
  res.status(200).json({ message: 'Authorized' });
});

// logout
router.post('/logout', (req, res) => {
  try {
    res.cookie('watchtower_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
