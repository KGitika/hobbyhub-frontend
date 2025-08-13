import React, { useEffect, useState } from 'react';
import HobbyTile from '../components/HobbyTile.jsx';
import { getHobbies } from '../api/hobbies.js';
import { getUserHobbies, updateUserHobbies } from '../api/users.js';
import { useAuth } from '../context/AuthContext.jsx';
import NavBar from '../components/Navbar';
import hobbyIcons from '../images/hobbyIcons.js';

export default function Hobbies() {
  const { user, setUser } = useAuth();
  const [hobbies, setHobbies] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    Promise.all([getHobbies(), getUserHobbies(user.id)])
      .then(([all, userHobbies]) => {
        setHobbies(all);
        const nameToId = new Map(all.map((h) => [h.name, h.id]));
        const ids = (userHobbies || []).map((h) => {
          if (typeof h === 'object') return h.id ?? nameToId.get(h.name);
          return nameToId.get(h) ?? h;
        });
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
      setSaving(true);
      const hobbiesToSave = Array.from(selected).map((id) => {
        const hobby = hobbies.find((h) => h.id === id);
        return hobby ? hobby.name : id;
      });
      await updateUserHobbies(user.id, hobbiesToSave);
      setUser({ ...user, interests: hobbiesToSave });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const joined = hobbies.filter((h) => selected.has(h.id));
  const available = hobbies.filter((h) => !selected.has(h.id));

  return (
    <div>
      <NavBar />
      <div className="auth-page">
        <h2>Your Hobbies</h2>
        {error && <div className="error">{error}</div>}
        <h3>Joined</h3>
        <div className="hobby-grid">
          {joined.map((h) => (
            <HobbyTile
              key={h.id}
              label={h.name}
              icon={hobbyIcons[h.name]}
              emoji={h.emoji}
              selected
              onClick={() => toggle(h.id)}
            />
          ))}
        </div>
        <h3>Other Hobbies</h3>
        <div className="hobby-grid">
          {available.map((h) => (
            <HobbyTile
              key={h.id}
              label={h.name}
              icon={hobbyIcons[h.name]}
              emoji={h.emoji}
              selected={false}
              onClick={() => toggle(h.id)}
            />
          ))}
        </div>
        <button className="hobby-save-button" onClick={handleSubmit} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}

