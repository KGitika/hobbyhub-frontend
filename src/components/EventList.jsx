import React from 'react';

function EventList({ events }) {
  return (
    <div>
      <h3>Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
