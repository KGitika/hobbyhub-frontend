import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import EventItem from '../components/EventItem.jsx';
import { getEvents, rsvpEvent, unrsvpEvent, createEvent } from '../api/events.js';
import { getGroups } from '../api/groups.js';
import { useAuth } from '../context/AuthContext.jsx';
import './Events.css';

export default function Events() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState({ title: '', date: '', location: '', groupId: '' });

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(data ?? []))
      .catch(() => setEvents([]));
  }, []);

  useEffect(() => {
    if (!user) return;
    getGroups()
      .then((data) =>
        setGroups(
          (data ?? []).filter(
            (g) => g.isMember ?? g.members?.some((m) => m.id === user.id)
          )
        )
      )
      .catch(() => setGroups([]));
  }, [user]);

  async function toggleRsvp(event) {
    const updated = event.isRsvped ? await unrsvpEvent(event.id) : await rsvpEvent(event.id);
    setEvents((prev) => prev.map((e) => (e.id === event.id ? { ...e, isRsvped: updated.isRsvped } : e)));
  }

  async function handleCreate(e) {
    e.preventDefault();
    const { title, date, location, groupId } = form;
    const newEvent = await createEvent({ title, dateIso: new Date(date).toISOString(), location, groupId });
    setEvents((prev) => [...prev, newEvent]);
    setForm({ title: '', date: '', location: '', groupId: '' });
  }

  const upcoming = events.filter((e) => e.isRsvped);
  const others = events.filter((e) => !e.isRsvped);

  return (
    <div>
      <NavBar />
      <main className="events-page">
        <h2>Events</h2>
        <section className="event-section">
          <h3>Your Upcoming Events</h3>
          {upcoming.map((e) => (
            <EventItem key={e.id} {...e} onToggle={() => toggleRsvp(e)} />
          ))}
          {upcoming.length === 0 && <p>No upcoming events.</p>}
        </section>
        <section className="event-section">
          <h3>Other Events</h3>
          {others.map((e) => (
            <EventItem key={e.id} {...e} onToggle={() => toggleRsvp(e)} />
          ))}
          {others.length === 0 && <p>No other events.</p>}
        </section>
        <section className="event-section create-event">
          <h3>Create Event</h3>
          <form className="create-event-form" onSubmit={handleCreate}>
            <label>
              Title
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </label>
            <label>
              Date &amp; Time
              <input
                type="datetime-local"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </label>
            <label>
              Location
              <input
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              />
            </label>
            <label>
              Group
              <select
                value={form.groupId}
                onChange={(e) => setForm({ ...form, groupId: e.target.value })}
                required
              >
                <option value="">Select Group</option>
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.title || g.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Create</button>
          </form>
        </section>
      </main>
    </div>
  );
}
