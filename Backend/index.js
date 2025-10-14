const express = require('express');
const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => res.send('Server Running'));
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
