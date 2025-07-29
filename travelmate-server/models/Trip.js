const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  destination: String,
  budget: String,
  startDate: String,
  endDate: String,
  travelType: String,
  itinerary: Array,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

module.exports = mongoose.model('Trip', tripSchema);
