import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ allowOnboarding = false }) {
  // `useAuth` returns `undefined` if a component is rendered outside of
  // `AuthProvider`. Some of our tests intentionally render without the
  // provider to assert redirect behaviour, so we defensively default to an
  // empty object to avoid destructuring errors.
  const { token, user, loading } = useAuth() || {};

  // When `loading` is true (during auth bootstrap) we don't want to render
  // anything until the auth state is resolved.
  if (loading) return null;

  // No token means the user is unauthenticated – send them to login.
  if (!token) return <Navigate to="/login" replace />;

  // If onboarding is required (no interests) redirect unless the route
  // explicitly allows onboarding.
  if (
    !allowOnboarding &&
    user &&
    (!user.interests || user.interests.length === 0)
  ) {
    return <Navigate to="/onboarding/interests" replace />;
  }

  // Authenticated and onboarding complete – render the intended route.
  return <Outlet />;
}
