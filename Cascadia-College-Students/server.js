const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const USER = 'admin';
const PASS = 'Hiro0701!';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// --- AUTH API ---
app.post('/api/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (username !== USER || password !== PASS) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/change-password', (req, res) => {
  res.status(501).json({ error: 'Password change not supported in demo mode.' });
});

app.post('/api/forgot-password', (req, res) => {
  res.status(501).json({ error: 'Password reset not supported in demo mode.' });
});

// --- Dummy content/lease endpoints for demo ---
app.get('/api/get-content', (req, res) => {
  res.json({ hero_title: 'Demo Hero', hero_subtitle: 'Demo Subtitle' });
});
app.post('/api/update-content', (req, res) => {
  res.json({ success: true });
});
app.get('/api/get-lease-terms', (req, res) => {
  res.json({});
});
app.post('/api/update-lease-terms', (req, res) => {
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Admin portal running at http://localhost:${PORT}/admin.html`);
});
