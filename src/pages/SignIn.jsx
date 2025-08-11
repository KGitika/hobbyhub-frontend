import React, { useState } from 'react';
import './SignIn.css';
import logo from '../assets/react.svg';
import { API_BASE_URL } from '../config';

export default function SignIn({ onSignIn, onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('');
        if (onSignIn) onSignIn(data.id, data.name);
      } else {
        setMessage(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setMessage('Sign in failed');
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <img src={logo} alt="HobbyHub Logo" />
          HobbyHub
        </div>
      </header>

      {/* Sign In Form */}
      <div className="signin-container">
        <h2>Sign In to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signin-btn">
            Sign In
          </button>
        </form>

        <p>
          Don't have an account?{' '}
          <button type="button" onClick={onSwitch} className="link-button">
            Create one here
          </button>
        </p>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
