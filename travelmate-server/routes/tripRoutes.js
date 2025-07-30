const express = require('express');
const router = express.Router();

const { generateItinerary, getAllTrips } = require('../controllers/tripController');
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');

//  Protected routes
router.post('/generate', auth, generateItinerary);
router.get('/all', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.userId }).sort({ _id: -1 });
    res.json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  DELETE a trip (by owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!trip) return res.status(404).json({ error: 'Trip not found or unauthorized' });
    res.json({ message: 'Trip deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  UPDATE a trip (by owner only)
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedTrip) return res.status(404).json({ error: 'Trip not found or unauthorized' });
    res.json(updatedTrip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
