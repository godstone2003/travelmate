import React, { useState } from 'react';
import TripForm from '../components/TripForm';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
  const navigate = useNavigate();
  const [aiItinerary, setAiItinerary] = useState(null);

  const handleFormSubmit = async (data) => {
    try {
      console.log("Form data sent to backend:", data);
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/api/trips/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
         },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Result from backend:", result);
      navigate("/results", { state: result });
    } catch (error) {
      console.error("Error generating itinerary:", error);
    }
  };

  const handleAIPlan = async ({ destination, days, travelType, budget }) => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/ai/ai-plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination, days, travelType, budget })
    });

    const data = await res.json();
    setAiItinerary(data.itinerary);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="home-bg-blur"></div>
      <div className="container mt-5" style={{ position: 'relative', zIndex: 1 }}>
        <h2>Plan Your Trip</h2>
        <TripForm onSubmit={handleFormSubmit} />
        <Link to="/view-trips" className="btn btn-secondary mt-3">
          View Saved Trips
        </Link>
        {aiItinerary && (
          <div className="alert alert-info mt-3">
            <h5>AI Itinerary:</h5>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{aiItinerary}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
