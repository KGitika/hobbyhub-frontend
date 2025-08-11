import React from 'react';
import './EventItem.css';

export default function EventItem({ title, dateIso, location, isRsvped, onToggle }) {
  const date = new Date(dateIso).toLocaleString();
  return (
    <div className="event-item">
      <div>
        <div className="event-title">{title}</div>
        <div className="event-meta">{date} @ {location}</div>
      </div>
      <button onClick={onToggle}>{isRsvped ? 'Un-RSVP' : 'RSVP'}</button>
    </div>
  );
}
