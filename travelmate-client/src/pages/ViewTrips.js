import React, { useEffect, useState } from 'react';
import '../App.css';

const ViewTrips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch("http://localhost:5000/api/trips/all", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched trips:", data);
        setTrips(Array.isArray(data) ? data : data.trips || []);
      })
      .catch((err) => console.error("Failed to fetch trips:", err));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/trips/${id}`, {
      method: 'DELETE',
    });
    setTrips(trips.filter(trip => trip._id !== id));
  };

  const handleEdit = (trip) => {
    alert(`Edit feature coming soon for trip to ${trip.destination}`);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="trips-bg-blur"></div>
      <div className="container mt-5" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="mb-4">Saved Trips</h2>
        {trips.length === 0 ? (
          <p>No trips found.</p>
        ) : (
          <ul className="list-group">
            {trips.map((trip, index) => (
              <li key={trip._id} className="list-group-item mb-3">
                <h5>📍 {trip.destination}</h5>
                <p><strong>💰 Budget:</strong> {trip.budget}</p>
                <p><strong>📅 Dates:</strong> {trip.startDate} to {trip.endDate}</p>
                <p><strong>🚀 Travel Type:</strong> {trip.travelType}</p>
                <ul>
                  {trip.itinerary.map((item, i) => (
                    <li key={i}>🗓️ Day {item.day}: {item.activity}</li>
                  ))}
                </ul>
                <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(trip._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewTrips;