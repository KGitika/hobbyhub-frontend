import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import EventList from '../components/EventList';

function GroupPage({ groupId }) {
  const [group, setGroup] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!groupId) return;
    fetch(`${API_BASE_URL}/groups/${groupId}`)
      .then((res) => res.json())
      .then(setGroup)
      .catch((err) => console.error('Error fetching group', err));
    fetch(`${API_BASE_URL}/groups/${groupId}/events`)
      .then((res) => res.json())
      .then(setEvents)
      .catch((err) => console.error('Error fetching events', err));
  }, [groupId]);

  if (!group) return <p>Loading group...</p>;

  return (
    <div>
      <h2>{group.name}</h2>
      <p>{group.description}</p>
      <EventList events={events} />
    </div>
  );
}

export default GroupPage;
