import React, { useEffect, useState } from 'react';
import { getGroups } from '../api/groups.js';
import JoinGroupButton from './JoinGroupButton';

function GroupList({ hobbyId, onSelectGroup }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (!hobbyId) {
      setGroups([]);
      return;
    }

    getGroups()
      .then((all) =>
        setGroups(
          (all || []).filter((g) => {
            const hobby = g.hobby?.name || g.hobby;
            return hobby === hobbyId;
          })
        )
      )
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
