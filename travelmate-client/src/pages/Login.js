import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user?.role); // save role if available

      alert("Login successful!");

      if (data.user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="login-bg-blur"></div>
      <div className="container mt-5" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="mb-4 text-center" style={{color:"white"}}>Welcome to TravelMate</h2>
        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="form-control mb-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
