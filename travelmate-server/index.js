const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const aiRoutes = require('./routes/aiRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('TravelMate API is running...');
});

// Connect to MongoDB, then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  });
