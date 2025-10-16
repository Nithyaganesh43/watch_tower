const axios = require('axios');
const https = require('https');

const TARGET_URL = 'https://internetprotocal.onrender.com/watchtower';
const PING_TIMEOUT = 5000;

const client = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  timeout: PING_TIMEOUT,
  validateStatus: () => true,
});

function pingOnce() {
  client.get(TARGET_URL).catch(() => {});  
}

function schedulePing() {
  setTimeout(() => {
    pingOnce();
    schedulePing();
  }, 10 * 60 * 1000);
}

schedulePing();
