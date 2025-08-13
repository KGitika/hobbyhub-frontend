import React from 'react';
import { NavLink, useInRouterContext } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ApplicationLogo from '../images/ApplicationLogo.png';
import './NavBar.css';

export default function NavBar() {
  const inRouter = useInRouterContext();
  const { logout } = useAuth() || {};

  function handleLogout() {
    if (logout) logout();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/hobbies', label: 'Hobbies' },
    { to: '/groups', label: 'Groups' },
    { to: '/events', label: 'Events' },
    // { to: '/connections', label: 'Connections' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {inRouter ? (
          <NavLink to="/dashboard" className="logo-link">
            <img src={ApplicationLogo} alt="HobbyHub logo" />
            <h1>HobbyHub</h1>
          </NavLink>
        ) : (
          <>
            <img src={ApplicationLogo} alt="HobbyHub logo" />
            <h1>HobbyHub</h1>
          </>
        )}
      </div>

      <div className="navbar-links">
        {links.map(({ to, label }) =>
          inRouter ? (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {label}
            </NavLink>
          ) : (
            <span key={to}>{label}</span>
          )
        )}
        {inRouter ? (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <span>Logout</span>
        )}
      </div>
    </nav>
  );
}