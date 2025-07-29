const User = require('../models/User');

const admin = async (req, res, next) => {
  try {
    // req.userId should be set by the auth middleware
    const user = await User.findById(req.userId);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Admin access only' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = admin;