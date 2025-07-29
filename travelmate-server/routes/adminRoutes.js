const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Trip = require('../models/Trip');

// Get all users (excluding passwords)
router.get('/users', auth, admin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get all trips
router.get('/trips', auth, admin, async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.json({ trips });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

// Get all trips for a specific user
router.get('/user/:userId/trips', auth, admin, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.params.userId });
    res.json({ trips });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user trips' });
  }
});

// NEW: Get users along with their trips
router.get('/users-with-trips', auth, admin, async (req, res) => {
  try {
    const users = await User.find({}, '-password').lean();
    const usersWithTrips = await Promise.all(
      users.map(async (user) => {
        const trips = await Trip.find({ userId: user._id }).lean();
        return { ...user, trips };
      })
    );
    res.json(usersWithTrips);
  } catch (err) {
    console.error("Error in users-with-trips:", err);
    res.status(500).json({ error: "Failed to fetch users and trips" });
  }
});

// NEW: Add a trip for a specific user
router.post('/user/:userId/trips', auth, admin, async (req, res) => {
  try {
    const { destination, budget, startDate, endDate, travelType } = req.body;

    const itinerary = [
      { day: 1, activity: `Arrival at ${destination}` },
      { day: 2, activity: `Explore ${destination}` },
      { day: 3, activity: `Departure from ${destination}` },
    ];

    const newTrip = await Trip.create({
      userId: req.params.userId,
      destination,
      budget,
      startDate,
      endDate,
      travelType,
      itinerary
    });

    res.status(201).json(newTrip);
  } catch (err) {
    console.error("Error adding trip:", err);
    res.status(500).json({ error: 'Failed to create trip' });
  }
});

// Delete a user and their trips
router.delete('/user/:userId', auth, admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    await Trip.deleteMany({ userId: req.params.userId });
    res.json({ message: 'User and their trips deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Delete a trip
router.delete('/trip/:tripId', auth, admin, async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.tripId);
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete trip' });
  }
});

// Get all users along with their trips
router.get('/users-with-trips', auth, admin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    const usersWithTrips = await Promise.all(
      users.map(async (user) => {
        const trips = await Trip.find({ userId: user._id });
        return { ...user.toObject(), trips };
      })
    );
    res.json(usersWithTrips);
  } catch (err) {
    console.error("Error fetching users with trips:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
