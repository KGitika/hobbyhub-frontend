import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

function HobbyList({ userId }) {
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    if (!userId) return;
    fetch(`${API_BASE_URL}/users/${userId}/hobbies`)
      .then((res) => res.json())
      .then(setHobbies)
      .catch((err) => console.error('Error fetching user hobbies', err));
  }, [userId]);

  return (
    <div>
      <h2>Your Hobbies</h2>
      <ul>
        {hobbies.map((hobby) => (
          <li key={hobby.id}>{hobby.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default HobbyList;
