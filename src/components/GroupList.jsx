import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import JoinGroupButton from './JoinGroupButton';

function GroupList({ hobbyId, onSelectGroup }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (!hobbyId) return;
    fetch(`${API_BASE_URL}/groups/${hobbyId}`)
      .then((res) => res.json())
      .then(setGroups)
      .catch((err) => console.error('Error fetching groups', err));
  }, [hobbyId]);

  return (
    <div>
      <h3>Groups</h3>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <span
              onClick={() => onSelectGroup && onSelectGroup(group.id)}
              style={{ cursor: 'pointer', marginRight: '8px' }}
            >
              {group.name}
            </span>
            <JoinGroupButton groupId={group.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupList;
