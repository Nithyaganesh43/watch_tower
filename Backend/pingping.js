const axios = require('axios');
const https = require('https');

const TARGET_URL = 'https://internetprotocal.onrender.com/';
const PING_TIMEOUT = 5000;

const client = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  timeout: PING_TIMEOUT,
  validateStatus: () => true,
});

function pingOnce() {
  client.get(TARGET_URL).catch(() => {}); // ignore errors silently
}

function schedulePing() {
  const minutes = Math.floor(Math.random() * 7) + 7; // 7–13 min
  setTimeout(() => {
    pingOnce();
    schedulePing();
  }, minutes * 60 * 1000);
}

// start
schedulePing();
