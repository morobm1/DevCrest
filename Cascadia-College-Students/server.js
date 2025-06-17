const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const DEFAULT_PASSWORD = 'admin';
const ALLOWED_USERS = [
  'brian.strider@capstonemp.com',
  'jahala.akins@capstonemp.com',
  'logan.kelly@capstonemp.com',
  'becky.vanwychen@liveatuwbothell.com'
];

// MongoDB Atlas connection string
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://<username>:<password>@user_auth.mongodb.net/';
const DB_NAME = 'user_auth';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

let db, contentCol, leaseCol, usersCol;

MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(DB_NAME);
    contentCol = db.collection('content');
    leaseCol = db.collection('lease_terms');
    usersCol = db.collection('users');
    console.log('Connected to MongoDB Atlas');
    // Ensure all allowed users exist
    ALLOWED_USERS.forEach(async email => {
      const user = await usersCol.findOne({ username: email });
      if (!user) {
        const hash = await bcrypt.hash(DEFAULT_PASSWORD, 10);
        await usersCol.insertOne({ username: email, password: hash, mustChangePassword: true });
      }
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// --- AUTH API ---
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!ALLOWED_USERS.includes(username)) return res.status(401).json({ error: 'Unauthorized' });
  const user = await usersCol.findOne({ username });
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid username or password.' });
  if (await bcrypt.compare(DEFAULT_PASSWORD, user.password) || user.mustChangePassword) {
    return res.json({ mustChangePassword: true });
  }
  res.json({ success: true });
});

app.post('/api/change-password', async (req, res) => {
  const { username, newPassword } = req.body;
  if (!ALLOWED_USERS.includes(username)) return res.status(401).json({ error: 'Unauthorized' });
  const hash = await bcrypt.hash(newPassword, 10);
  await usersCol.updateOne(
    { username },
    { $set: { password: hash, mustChangePassword: false } }
  );
  res.json({ success: true });
});

app.post('/api/forgot-password', async (req, res) => {
  const { username } = req.body;
  if (!ALLOWED_USERS.includes(username)) return res.status(401).json({ error: 'Unauthorized' });
  // For demo: set a temp password and return it (in production, send email)
  const tempPassword = Math.random().toString(36).slice(-8);
  const hash = await bcrypt.hash(tempPassword, 10);
  await usersCol.updateOne(
    { username },
    { $set: { password: hash, mustChangePassword: true } }
  );
  res.json({ message: `Temporary password: ${tempPassword}` });
});

// --- EXISTING CONTENT/LEASE API ---
function checkAuth(req, res, next) {
  // Basic Auth for legacy endpoints (can be improved to use session/JWT)
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Basic ')) return res.status(401).send('Unauthorized');
  const [user, pass] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
  if (ALLOWED_USERS.includes(user)) {
    usersCol.findOne({ username: user }).then(userDoc => {
      if (!userDoc) return res.status(401).send('Unauthorized');
      bcrypt.compare(pass, userDoc.password).then(match => {
        if (match) return next();
        return res.status(401).send('Unauthorized');
      });
    });
  } else {
    return res.status(401).send('Unauthorized');
  }
}

app.get('/api/get-content', async (req, res) => {
  const doc = await contentCol.findOne({ _id: 'main' });
  if (doc) {
    delete doc._id;
    res.json(doc);
  } else {
    res.json({});
  }
});

app.post('/api/update-content', checkAuth, async (req, res) => {
  const data = req.body;
  await contentCol.updateOne(
    { _id: 'main' },
    { $set: { ...data } },
    { upsert: true }
  );
  res.json({ success: true });
});

app.get('/api/get-lease-terms', async (req, res) => {
  const doc = await leaseCol.findOne({ _id: 'main' });
  res.json(doc ? doc.data : {});
});

app.post('/api/update-lease-terms', checkAuth, async (req, res) => {
  const data = req.body;
  await leaseCol.updateOne(
    { _id: 'main' },
    { $set: { data } },
    { upsert: true }
  );
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Admin portal running at http://localhost:${PORT}/admin.html`);
});
