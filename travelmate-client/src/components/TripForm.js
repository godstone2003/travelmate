import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // import styles

const TripForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    destination: '',
    budget: '',
    startDate: null,
    endDate: null,
    travelType: 'solo',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert Date objects to strings if needed
    const formattedData = {
      ...formData,
      startDate: formData.startDate?.toISOString().split('T')[0],
      endDate: formData.endDate?.toISOString().split('T')[0]
    };
    onSubmit(formattedData);
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
        <DatePicker
          selected={formData.startDate}
          onChange={(date) => setFormData({...formData, startDate: date})}
          className="form-control"
          placeholderText="Select Start Date"
          dateFormat="dd-MM-yyyy"
        />
      </div>
      <div className="mb-3">
        <label>End Date</label>
        <DatePicker
          selected={formData.endDate}
          onChange={(date) => setFormData({...formData, endDate: date})}
          className="form-control"
          placeholderText="Select End Date"
          dateFormat="dd-MM-yyyy"
        />
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
