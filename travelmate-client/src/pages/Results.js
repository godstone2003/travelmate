import React from 'react';
import { useLocation } from 'react-router-dom';

const getCityImageUrl = (city) =>
  `https://source.unsplash.com/800x300/?${encodeURIComponent(city)},city,travel`;

const Results = () => {
  const { state } = useLocation();

  return (
    <div className="container mt-5">
      {state?.destination && (
        <img
          src={getCityImageUrl(state.destination)}
          alt={state.destination}
          className="img-fluid rounded mb-4"
          style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }}
        />
      )}
      <h2>Trip to {state?.destination}</h2>
      <p><strong>Travel Type:</strong> {state?.travelType}</p>
      <p><strong>Budget:</strong> ₹{state?.budget}</p>
      <p><strong>Dates:</strong> {state?.startDate} to {state?.endDate}</p>
      <hr />
      <h4>Itinerary:</h4>
      <ul>
        {state?.itinerary?.map((item, index) => (
          <li key={index}>Day {item.day}: {item.activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default Results;