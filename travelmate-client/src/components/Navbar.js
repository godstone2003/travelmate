import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert("Logged out!");
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">TravelMate</Link>
      <div className="navbar-nav">
        {token ? (
          <>
            <Link className="nav-link" to="/">Plan Trip</Link>
            <Link className="nav-link" to="/view-trips">View Trips</Link>
            <button className="btn btn-outline-danger btn-sm ms-3" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
