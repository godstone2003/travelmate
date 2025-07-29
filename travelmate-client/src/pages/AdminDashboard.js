// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const AdminDashboard = () => {
  const [usersWithTrips, setUsersWithTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsersWithTrips = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE}/api/admin/users-with-trips`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsersWithTrips(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users and trips", error);
    }
  };

  const deleteTrip = async (tripId) => {
    if (!window.confirm("Delete this trip?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE}/api/admin/trip/${tripId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchUsersWithTrips(); // Refresh data
    } catch (err) {
      console.error("Error deleting trip", err);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Delete this user and their trips?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE}/api/admin/user/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchUsersWithTrips(); // Refresh data
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  useEffect(() => {
    fetchUsersWithTrips();
  }, []);

  if (loading) return <p>Loading users and trips...</p>;

  return (
    <div className="p-4">
       <div className="admin-bg-blur"></div> 
      <h2>Admin Dashboard</h2>
      {usersWithTrips.map((user) => (
        <div key={user._id} className="border p-3 mb-4 rounded shadow">
          <h3>{user.email} </h3>
          <button
           onClick={() => deleteUser(user._id)}
            className="delete-button">
             Delete User
            </button>

          <ul className="ml-4">
            {user.trips.map((trip) => (
              <li key={trip._id} className="mb-2">
                <strong>{trip.destination}</strong> ({trip.startDate} - {trip.endDate}) - ₹{trip.budget} &nbsp; &nbsp;
                <button
                  onClick={() => deleteTrip(trip._id)}
                  className="delete-button"
                >
                  Delete Trip
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
