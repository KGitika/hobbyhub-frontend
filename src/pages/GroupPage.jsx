import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroup, joinGroup, leaveGroup } from '../api/groups.js';
import { rsvpEvent, unrsvpEvent } from '../api/events.js';
import NavBar from '../components/NavBar.jsx';
import EventItem from '../components/EventItem.jsx';

export default function GroupPage() {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    getGroup(groupId).then(setGroup);
  }, [groupId]);

  async function toggleMembership() {
    if (!group) return;
    const updated = group.isMember ? await leaveGroup(group.id) : await joinGroup(group.id);
    setGroup({ ...group, isMember: updated.isMember });
  }

  async function toggleRsvp(event) {
    const updated = event.isRsvped ? await unrsvpEvent(event.id) : await rsvpEvent(event.id);
    setGroup({
      ...group,
      upcomingEvents: group.upcomingEvents.map((e) => (e.id === event.id ? { ...e, isRsvped: updated.isRsvped } : e)),
    });
  }

  if (!group) return null;

  return (
    <div>
      <NavBar />
      <h2>{group.name}</h2>
      <p>{group.description}</p>
      <button onClick={toggleMembership}>{group.isMember ? 'Leave' : 'Join'}</button>
      <h3>Upcoming Events</h3>
      {group.upcomingEvents.map((e) => (
        <EventItem key={e.id} {...e} onToggle={() => toggleRsvp(e)} />
      ))}
    </div>
  );
}
