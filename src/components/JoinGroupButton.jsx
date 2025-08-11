import React, { useState } from 'react';
import { joinGroup } from '../api/groups.js';

function JoinGroupButton({ groupId }) {
  const [joined, setJoined] = useState(false);

  const join = async () => {
    try {
      await joinGroup(groupId);
      setJoined(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={join} disabled={joined}>
      {joined ? 'Joined' : 'Join Group'}
    </button>
  );
}

export default JoinGroupButton;
