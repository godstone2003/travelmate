const Trip = require('../models/Trip');

function parseItinerary(aiText) {
  const dayRegex = /Day\s*(\d+):/gi;
  const parts = aiText.split(dayRegex);
  const result = [];
  for (let i = 1; i < parts.length; i += 2) {
    const day = parseInt(parts[i]);
    const activity = parts[i + 1] ? parts[i + 1].trim() : '';
    result.push({ day, activity });
  }
  return result.length ? result : [{ day: 1, activity: aiText }];
}

const generateItinerary = async (req, res) => {
  const { destination, budget, startDate, endDate, travelType } = req.body;

  // Calculate number of days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const numberOfDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  // Dynamically import node-fetch for CommonJS
  const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

  // Prepare prompt for AI
  const prompt = `Create a personalized ${numberOfDays}-day ${travelType} trip to ${destination} with a ₹${budget} budget. Include daily activities and travel tips.`;

  try {
    // Call the AI API
    const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const aiData = await aiResponse.json();
    const aiItineraryText = aiData.choices?.[0]?.message?.content || 'AI failed to respond.';

    // Parse the AI response into days/activities
    const itineraryArray = parseItinerary(aiItineraryText);

    const newTrip = new Trip({
      destination,
      budget,
      startDate,
      endDate,
      travelType,
      itinerary: itineraryArray,
      userId: req.userId
    });

    const savedTrip = await newTrip.save();
    res.json(savedTrip);
  } catch (error) {
    console.error("❌ Error saving trip:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateItinerary,
};