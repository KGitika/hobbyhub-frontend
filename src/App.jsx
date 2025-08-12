import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LogIn.jsx';
import Signup from './pages/SignUp.jsx';
import HobbySelector from './pages/HobbySelector.jsx';
import Dashboard from './pages/Dashboard.jsx';
import GroupPage from './pages/GroupPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Hobbies from './pages/Hobbies.jsx';
import Groups from './pages/Groups.jsx';
import Events from './pages/Events.jsx';
import Connections from './pages/Connections.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute allowOnboarding />}> 
        <Route path="/onboarding/interests" element={<HobbySelector />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:groupId" element={<GroupPage />} />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/events" element={<Events />} />
        <Route path="/connections" element={<Connections />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
