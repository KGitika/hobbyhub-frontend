import React, { useState } from 'react';
import './SignUp.css';
import logo from '../assets/react.svg';

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Placeholder for sign-up logic
    console.log('Sign up form submitted', formData);
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <img src={logo} alt="HobbyHub Logo" />
          HobbyHub
        </div>
        <a href="/signin" className="header-link">Sign In</a>
      </header>

      {/* Sign Up Form */}
      <div className="signup-container">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p>
          Already have an account?{' '}
          <a href="/signin">Sign in here</a>
        </p>
      </div>
    </div>
  );
}

