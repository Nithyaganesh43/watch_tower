const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate: [
        { validator: validator.isEmail, message: 'Invalid email format' },
        {
          validator: (v) => v.length <= 100,
          message: 'Email too long (max 100 chars)',
        },
      ],
    },
    fullName: {
      type: String,
      trim: true,
      validate: {
        validator: (v) => !v || v.length <= 50,
        message: 'Full name too long (max 50 chars)',
      },
    },
  },
  { timestamps: true }
);

const serverSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      validate: {
        validator: (v) => !v || v.length <= 100,
        message: 'User email too long (max 100 chars)',
      },
    },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: (v) => !v || v.length <= 200,
        message: 'URL too long (max 200 chars)',
      },
    },
    status: {
      type: String,
      enum: ['online', 'offline', 'checking'],
      default: 'checking',
    },
    lastCheck: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = {
  User: mongoose.model('User', userSchema),
  Server: mongoose.model('Server', serverSchema),
};
