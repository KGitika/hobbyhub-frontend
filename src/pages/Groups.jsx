import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import { getGroups, joinGroup, createGroup, deleteGroup, leaveGroup } from '../api/groups.js';
import { useAuth } from '../context/AuthContext.jsx';
import './Groups.css';

export default function Groups() {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', hobby: '', description: '' });

  // Fetch groups once when the component mounts. This avoids multiple
  // network calls (e.g. from React strict mode) and lets us filter
  // client-side based on the logged-in user's interests.
  useEffect(() => {
    let ignore = false;
    getGroups().then((data) => {
      if (!ignore) setGroups(data);
    });
    return () => {
      ignore = true;
    };
  }, []);

  // Filter groups by the user's interests and membership.
  const related = groups.filter((g) =>
    user?.interests?.includes(g.hobby?.name || g.hobby)
  );
  const joined = related.filter(
    (g) => g.isMember ?? g.members?.some((m) => m.id === user?.id)
  );
  const available = related.filter(
    (g) => !(g.isMember ?? g.members?.some((m) => m.id === user?.id))
  );

  async function handleJoin(id) {
    await joinGroup(id);
    // Refresh groups to reflect latest membership and details from server
    const updated = await getGroups();
    setGroups(updated);
  }

  async function handleDelete(id) {
    await deleteGroup(id);
    // Refresh groups after deletion to ensure state matches server
    const updated = await getGroups();
    setGroups(updated);
  }

  async function handleLeave(id) {
    await leaveGroup(id);
    setGroups((gs) =>
      gs.map((g) =>
        g.id === id
          ? {
              ...g,
              isMember: false,
              members: g.members?.filter((m) => m.id !== user?.id),
            }
          : g
      )
    );
  }

  function toggleForm() {
    setShowForm((s) => !s);
  }

  function updateForm(field, value) {
    setForm({ ...form, [field]: value });
  }

  async function handleCreate(e) {
    e.preventDefault();
    await createGroup(form);
    // Refresh groups after creation to include server-generated fields
    const updated = await getGroups();
    setGroups(updated);
    setForm({ name: '', hobby: '', description: '' });
    setShowForm(false);
  }

  return (
    <div>
      <NavBar />
      <main className="groups-page">
        <section className="group-section">
          <h2>Your Groups</h2>
          <ul>
            {joined.map((g) => {
              const isOwner = g.ownerId === user?.id || g.owner?.id === user?.id;
              return (
                <li key={g.id} className="group-card">
                  <div className="group-info">
                    <strong>{g.title || g.name}</strong>
                    {g.description && (
                      <p className="group-description">{g.description}</p>
                    )}
                  </div>
                  <div className="group-actions">
                    {isOwner ? (
                      <button onClick={() => handleDelete(g.id)}>Delete</button>
                    ) : (
                      <button onClick={() => handleLeave(g.id)}>Leave</button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="group-section">
          <h2>Available Groups</h2>
          <ul>
            {available.map((g) => (
              <li key={g.id} className="group-card">
                <div className="group-info">
                  <strong>{g.title || g.name}</strong>
                  {g.description && (
                    <p className="group-description">{g.description}</p>
                  )}
                </div>
                <div className="group-actions">
                  <button onClick={() => handleJoin(g.id)}>Join</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <button className="create-group-toggle" onClick={toggleForm}>
          {showForm ? 'Cancel' : 'Create Group'}
        </button>
        {showForm && (
          <form className="create-group-form" onSubmit={handleCreate}>
            <label>
              Group Name
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateForm('name', e.target.value)}
                required
              />
            </label>
            <label>
              Hobby
              <select
                value={form.hobby}
                onChange={(e) => updateForm('hobby', e.target.value)}
                required
              >
                <option value="" disabled>
                  Select hobby
                </option>
                {user?.interests?.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Description
              <textarea
                value={form.description}
                onChange={(e) => updateForm('description', e.target.value)}
                required
              />
            </label>
            <button type="submit">Create</button>
          </form>
        )}
      </main>
    </div>
  );
}
