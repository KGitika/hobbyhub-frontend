import React, { useEffect, useState } from 'react';
import HobbyTile from '../components/HobbyTile.jsx';
import { getHobbies } from '../api/hobbies.js';
import { getUserHobbies, updateUserHobbies } from '../api/users.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import hobbyIcons from '../images/hobbyIcons.js';

export default function HobbySelector() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [hobbies, setHobbies] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    Promise.all([getHobbies(), getUserHobbies(user.id)])
      .then(([all, userHobbies]) => {
        setHobbies(all);
        const ids = (userHobbies || []).map((h) => (typeof h === 'object' ? h.id : h));
        setSelected(new Set(ids));
      })
      .catch((err) => setError(err.message));
  }, [user?.id]);

  function toggle(hobbyId) {
    const copy = new Set(selected);
    if (copy.has(hobbyId)) copy.delete(hobbyId); else copy.add(hobbyId);
    setSelected(copy);
  }

  async function handleSubmit() {
    try {
      await updateUserHobbies(user.id, Array.from(selected));
      setUser({ ...user, interests: Array.from(selected) });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <NavBar />
      <div className="auth-page">
        <h2>Select your hobbies</h2>
        {error && <div className="error">{error}</div>}
        <div className="hobby-grid">
          {hobbies.map((h) => (
            <HobbyTile
              key={h.id}
              label={h.name}
              icon={hobbyIcons[h.name]}
              emoji={h.emoji}
              selected={selected.has(h.id)}
              onClick={() => toggle(h.id)}
            />
          ))}
        </div>
        <button onClick={handleSubmit}>Continue to Dashboard</button>
      </div>
    </div>
  );
}
