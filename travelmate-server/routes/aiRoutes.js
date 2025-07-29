const express = require('express');
const router = express.Router();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

router.post('/ai-plan', async (req, res) => {
  // Use dynamic import for node-fetch v3+
  const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

  const { destination, days, travelType, budget } = req.body;

  const prompt = `Create a personalized ${days}-day ${travelType} trip to ${destination} with a ₹${budget} budget. Include daily activities and travel tips.`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    // Optional: log the data for debugging
    // console.log('AI API response:', data);
    const message = data.choices?.[0]?.message?.content || 'AI failed to respond.';
    res.json({ itinerary: message });

  } catch (err) {
    console.error('OpenRouter Error:', err);
    res.status(500).json({ error: 'AI planning failed' });
  }
});

module.exports = router;