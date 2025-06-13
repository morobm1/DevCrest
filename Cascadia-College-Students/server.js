const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const USER = 'admin';
const PASS = 'Hiro0701!';

const app = express();
// Body parser must come BEFORE static!
app.use(bodyParser.json());

// Simple static credential middleware
function checkAuth(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Basic ')) return res.status(401).send('Unauthorized');
  const [user, pass] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
  if (user === USER && pass === PASS) return next();
  return res.status(401).send('Unauthorized');
}

// Serve static files (admin.html, lease_terms.json, etc.)
app.use(express.static(__dirname));

// Update lease_terms.json
app.post('/api/update-lease-terms', checkAuth, (req, res) => {
  const data = req.body;
  const filePath = path.join(__dirname, 'lease_terms.json');
  fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
    if (err) return res.status(500).json({ error: 'Failed to write file.' });
    res.json({ success: true });
  });
});

// Update content.json (for hero section and other editable text)
app.post('/api/update-content', checkAuth, (req, res) => {
  const data = req.body;
  const filePath = path.join(__dirname, 'content.json');
  fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
    if (err) return res.status(500).json({ error: 'Failed to write file.' });
    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Admin portal running at http://localhost:${PORT}/admin.html`);
});
