import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Replace with your actual backend endpoints
    const fetchData = async () => {
      try {
        const userRes = await axios.get("/api/dashboard/user");
        const recsRes = await axios.get("/api/dashboard/recommendations");

        setUserData(userRes.data);
        setRecommendations(recsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  if (!userData) return <div className="dashboard-loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">
          🎯 <span>HobbyHub</span>
        </div>
        <nav className="nav-menu">
          <button className="active">Dashboard</button>
          <button>Groups</button>
          <button>Events</button>
          <button>Profile</button>
        </nav>
      </header>

      {/* Welcome Section */}
      <section className="welcome-section">
        <h2>Welcome back, {userData.name}! 👋</h2>
        <div className="stats-cards">
          <div className="stat-card purple">
            <h3>{userData.joinedGroups}</h3>
            <p>Joined Groups</p>
          </div>
          <div className="stat-card blue">
            <h3>{userData.upcomingEvents}</h3>
            <p>Upcoming Events</p>
          </div>
          <div className="stat-card indigo">
            <h3>{userData.newConnections}</h3>
            <p>New Connections</p>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="recommend-section">
        <h4>✨ Recommended for You</h4>
        <p>Based on your interests and activity</p>
        <div className="recommend-cards">
          {recommendations.map((rec, i) => (
            <div key={i} className="recommend-card">
              <span className="emoji">{rec.emoji}</span>
              <span className="label">{rec.label}</span>
              <span className="match">{rec.matchPercentage}% match</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
