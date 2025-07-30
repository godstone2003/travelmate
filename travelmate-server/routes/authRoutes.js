const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log(" No user found");
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      console.log(" Password doesn't match");
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log(" Login successful");

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2d' });

    res.json({
      token,
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(" Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
