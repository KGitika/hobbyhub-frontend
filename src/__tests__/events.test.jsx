import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Events from '../pages/Events.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import * as eventsApi from '../api/events.js';
import * as groupsApi from '../api/groups.js';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Events page', () => {
  it('shows only joined groups in the group selector', async () => {
    vi.spyOn(eventsApi, 'getEvents').mockResolvedValue([]);
    vi.spyOn(groupsApi, 'getGroups').mockResolvedValue([
      { id: 'g1', name: 'Photography Circle', isMember: true },
      { id: 'g2', name: 'Hiking Club', isMember: false },
      { id: 'g3', name: 'Chess Group', members: [{ id: 'u1' }] },
      { id: 'g4', name: 'Cooking Group', members: [{ id: 'u2' }] },
    ]);

    render(
      <AuthContext.Provider value={{ user: { id: 'u1' } }}>
        <MemoryRouter>
          <Events />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await screen.findByRole('option', { name: 'Photography Circle' });
    screen.getByRole('option', { name: 'Chess Group' });
    expect(screen.queryByRole('option', { name: 'Hiking Club' })).toBeNull();
    expect(screen.queryByRole('option', { name: 'Cooking Group' })).toBeNull();
  });

  it('displays group title in selector when name is missing', async () => {
    vi.spyOn(eventsApi, 'getEvents').mockResolvedValue([]);
    vi.spyOn(groupsApi, 'getGroups').mockResolvedValue([
      { id: 'g1', title: 'Book Club', isMember: true },
    ]);

    render(
      <AuthContext.Provider value={{ user: { id: 'u1' } }}>
        <MemoryRouter>
          <Events />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await screen.findByRole('option', { name: 'Book Club' });
  });
});
