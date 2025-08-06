import React, { useState } from 'react';
import { API_BASE_URL } from '../config';

function JoinGroupButton({ groupId }) {
  const [joined, setJoined] = useState(false);

  const joinGroup = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/groups/${groupId}/join`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to join group');
      setJoined(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={joinGroup} disabled={joined}>
      {joined ? 'Joined' : 'Join Group'}
    </button>
  );
}

export default JoinGroupButton;
