import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

function HobbySelector({ userId, onHobbiesSaved }) {
  const [hobbies, setHobbies] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/hobbies`)
      .then((res) => res.json())
      .then(setHobbies)
      .catch((err) => console.error('Error fetching hobbies', err));
  }, []);

  const toggleHobby = (id) => {
    setSelectedHobbies((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  const saveHobbies = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${userId}/hobbies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedHobbies),
      });
      if (!res.ok) throw new Error('Failed to save');
      setMessage('✅ Hobbies saved successfully!');
      if (onHobbiesSaved) onHobbiesSaved();
    } catch (err) {
      console.error(err);
      setMessage('Failed to save hobbies');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Select Your Hobbies</h2>
      {hobbies.length === 0 && <p>Loading hobbies...</p>}
      {hobbies.map((hobby) => (
        <div key={hobby.id}>
          <input
            type="checkbox"
            checked={selectedHobbies.includes(hobby.id)}
            onChange={() => toggleHobby(hobby.id)}
          />
          {hobby.name}
        </div>
      ))}
      <br />
      <button onClick={saveHobbies}>Save Hobbies</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default HobbySelector;
