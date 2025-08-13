import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getSummary } from '../api/dashboard.js';
import { getGroupRecommendations } from '../api/recommendations.js';
import { getRecentActivities } from '../api/activities.js';
import StatCard from '../components/StatCard.jsx';
import RecommendationCard from '../components/RecommendationCard.jsx';
import NavBar from '../components/Navbar';

const defaultSummary = {
  interestedHobbiesCount: 0,
  joinedGroupsCount: 0,
  upcomingEventsCount: 0,
  newConnectionsCount: 0,
};

export default function Dashboard() {
  const { user } = useAuth();

  const [summary, setSummary] = useState(defaultSummary);
  const [recs, setRecs] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getSummary()
      .then((data) =>
        setSummary({
          interestedHobbiesCount: data?.interestedHobbiesCount ?? 0,
          joinedGroupsCount: data?.joinedGroupsCount ?? 0,
          upcomingEventsCount: data?.upcomingEventsCount ?? 0,
          newConnectionsCount: data?.newConnectionsCount ?? 0,
        })
      )
      .catch(() => setSummary(defaultSummary));

    getGroupRecommendations()
      .then((data) => setRecs(data ?? []))
      .catch(() => setRecs([]));

    getRecentActivities()
      .then((data) => setActivities(data ?? []))
      .catch(() => setActivities([]));
  }, []);

  return (
    <div>
      <NavBar />
      <h2>Welcome back, {user?.name}! 👋</h2>
      <div className="stat-grid">
        <Link to="/hobbies" style={{ textDecoration: 'none' }}>
          <StatCard label="Interested Hobbies" value={summary.interestedHobbiesCount} />
        </Link>
        <Link to="/groups" style={{ textDecoration: 'none' }}>
          <StatCard label="Joined Groups" value={summary.joinedGroupsCount} />
        </Link>
        <Link to="/events" style={{ textDecoration: 'none' }}>
          <StatCard label="Upcoming Events" value={summary.upcomingEventsCount} />
        </Link>
        <StatCard label="New Connections" value={summary.newConnectionsCount} />
      </div>
      <h3>Recommended for You</h3>
      <div className="recs-grid">
        {recs.map((r) => (
          <RecommendationCard key={r.groupId} name={r.name} matchPct={r.matchPct} groupId={r.groupId} />
        ))}
      </div>
      <h3>Recent Activity</h3>
      <ul>
        {activities.map((a) => (
          <li key={a.id}>{a.text} — {a.age}</li>
        ))}
      </ul>
    </div>
  );
}
