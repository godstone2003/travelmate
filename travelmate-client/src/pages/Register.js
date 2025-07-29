import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.message) {
      alert("Registration successful! Please login.");
      navigate('/login');
    } else {
      alert(data.error || "Registration failed.");
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="login-bg-blur"></div>
      <div className="container mt-5" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="mb-4 text-center" style={{color:"white"}}>Register for TravelMate</h2>
        <form onSubmit={handleRegister}>
          <input className="form-control mb-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input className="form-control mb-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button className="btn btn-success w-100" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
