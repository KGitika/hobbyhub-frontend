// src/pages/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/users`, {
        name,
        email
      });
      setMessage(`Registered with ID: ${res.data.id}`);
      if (onRegister) onRegister(res.data.id); // Pass ID to App
    } catch (err) {
      console.error(err);
      setMessage('Registration failed');
    }
  };

  return (
      <div style={{ padding: '20px' }}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
          /><br /><br />
          <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
          /><br /><br />
          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
      </div>
  );
}

export default Register;
