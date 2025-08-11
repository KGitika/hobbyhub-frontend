// src/pages/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function Register({ onRegister, onSwitch }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) throw new Error('Failed to register');
      const data = await res.json();
      setMessage(`Registered with ID: ${data.id}`);
      if (onRegister) onRegister(data.id); // Pass ID to App
    } catch (err) {
      console.error(err);
      setMessage('Registration failed');
    }
  };

  return (
        <div className="register-container">
          <h2>Register</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button>
          </form>
          {message && <p className="message">{message}</p>}
          <p>
            Already have an account?{' '}
            <button type="button" onClick={onSwitch} className="link-button">
              Sign in here
            </button>
          </p>
        </div>
  );
}

export default Register;
