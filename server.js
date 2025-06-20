const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Import routes
const courseRoutes = require('./EduHub/backend/routes/courses');
const paymentRoutes = require('./EduHub/backend/routes/pay');
const authRoutes = require('./EduHub/backend/routes/auth'); // correct path

// Use routes
app.use('/api/courses', courseRoutes);
app.use('/api/pay', paymentRoutes);
app.use('/api/auth', authRoutes); // ✅ This line is crucial!



// Test route
app.get('/', (req, res) => {
  res.send('EduHub backend is running');
});

// Start server
app.listen(port, () => {
  console.log(`EduHub backend running at http://localhost:${port}`);
});

