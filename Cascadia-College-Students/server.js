const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const USER = 'admin';
const PASS = 'Hiro0701!';

// MongoDB Atlas connection string (replace <db_password> with your actual password)
const MONGO_URI = 'mongodb+srv://brianstrider:Tsuaki1234@cascadia-cluster.bmtuiu2.mongodb.net/';
const DB_NAME = 'cascadia';

const app = express();
app.use(bodyParser.json());

function checkAuth(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Basic ')) return res.status(401).send('Unauthorized');
  const [user, pass] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
  if (user === USER && pass === PASS) return next();
  return res.status(401).send('Unauthorized');
}

app.use(express.static(__dirname));

let db, contentCol, leaseCol;

MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(DB_NAME);
    contentCol = db.collection('content');
    leaseCol = db.collection('lease_terms');
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Get content.json
app.get('/api/get-content', async (req, res) => {
  const doc = await contentCol.findOne({ _id: 'main' });
  res.json(doc ? doc.data : {});
});

// Update content.json
app.post('/api/update-content', checkAuth, async (req, res) => {
  const data = req.body;
  await contentCol.updateOne(
    { _id: 'main' },
    { $set: { data } },
    { upsert: true }
  );
  res.json({ success: true });
});

// Get lease_terms.json
app.get('/api/get-lease-terms', async (req, res) => {
  const doc = await leaseCol.findOne({ _id: 'main' });
  res.json(doc ? doc.data : {});
});

// Update lease_terms.json
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
