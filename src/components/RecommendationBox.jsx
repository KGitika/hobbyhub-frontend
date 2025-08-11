import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

function RecommendationBox({ userId }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!userId) return;
    fetch(`${API_BASE_URL}/users/${userId}/recommendations`)
      .then((res) => res.json())
      .then(setRecommendations)
      .catch((err) => console.error('Error fetching recommendations', err));
  }, [userId]);

  if (recommendations.length === 0) return null;

  return (
    <div>
      <h3>Recommended Hobbies</h3>
      <ul>
        {recommendations.map((rec) => (
          <li key={rec.id}>{rec.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationBox;
