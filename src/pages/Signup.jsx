import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.js';
import NavBar from '../components/Navbar';
import { useAuth } from '../context/AuthContext.jsx';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState(null);
  const { login } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await signup({ name: form.name, email: form.email, password: form.password });
      await login({ email: form.email, password: form.password });
      navigate('/onboarding/interests');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <NavBar />
      <div className="auth-page">
        <h2>Sign Up</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required autoComplete="name" />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required autoComplete="email" />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required autoComplete="new-password" />
          <input name="confirm" type="password" placeholder="Confirm Password" value={form.confirm} onChange={handleChange} required autoComplete="new-password" />
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}
