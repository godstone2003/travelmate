import React, { useState } from 'react';

const TripForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    destination: '',
    budget: '',
    startDate: '',
    endDate: '',
    travelType: 'solo',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <div className="mb-3">
        <label>Destination</label>
        <input type="text" className="form-control" name="destination" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Budget (₹)</label>
        <input type="number" className="form-control" name="budget" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Start Date</label>
        <input type="date" className="form-control" name="startDate" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>End Date</label>
        <input type="date" className="form-control" name="endDate" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Travel Type</label>
        <select name="travelType" className="form-select" onChange={handleChange}>
          <option value="solo">Solo</option>
          <option value="family">Family</option>
          <option value="group">Group</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Generate Itinerary</button>
    </form>
  );
};

export default TripForm;
