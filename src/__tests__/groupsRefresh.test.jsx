import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Groups from '../pages/Groups.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import * as groupsApi from '../api/groups.js';

const user = { id: 'u1', interests: ['Hiking'] };

const renderGroups = () =>
  render(
    <AuthContext.Provider value={{ user }}>
      <MemoryRouter>
        <Groups />
      </MemoryRouter>
    </AuthContext.Provider>
  );

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});

describe('Groups page', () => {
  it('refreshes groups after joining', async () => {
    vi.spyOn(groupsApi, 'getGroups')
      .mockResolvedValueOnce([
        { id: 'g1', name: 'Hiking Club', hobby: 'Hiking', isMember: false, members: [] },
      ])
      .mockResolvedValueOnce([
        { id: 'g1', name: 'Hiking Club', hobby: 'Hiking', isMember: true, members: [{ id: 'u1' }] },
      ]);
    vi.spyOn(groupsApi, 'joinGroup').mockResolvedValue({});

    renderGroups();

    const joinButton = await screen.findByRole('button', { name: /Join/i });
    fireEvent.click(joinButton);

    await waitFor(() => expect(groupsApi.getGroups).toHaveBeenCalledTimes(2));

    const leaveButton = await screen.findByRole('button', { name: /Leave/i });
    expect(leaveButton).toBeInTheDocument();
  });

  it('refreshes groups after deleting', async () => {
    vi.spyOn(groupsApi, 'getGroups')
      .mockResolvedValueOnce([
        {
          id: 'g1',
          name: 'Hiking Club',
          hobby: 'Hiking',
          isMember: true,
          members: [{ id: 'u1' }],
          ownerId: 'u1',
        },
      ])
      .mockResolvedValueOnce([]);
    vi.spyOn(groupsApi, 'deleteGroup').mockResolvedValue({});

    renderGroups();

    const deleteButton = await screen.findByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => expect(groupsApi.getGroups).toHaveBeenCalledTimes(2));

    await waitFor(() => expect(screen.queryByText(/Hiking Club/i)).toBeNull());
  });

  it('refreshes groups after creating', async () => {
    vi.spyOn(groupsApi, 'getGroups')
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        {
          id: 'g1',
          name: 'Hiking Club',
          hobby: 'Hiking',
          isMember: true,
          members: [{ id: 'u1' }],
          ownerId: 'u1',
        },
      ]);
    vi.spyOn(groupsApi, 'createGroup').mockResolvedValue({});

    renderGroups();

    fireEvent.click(screen.getAllByRole('button', { name: /Create Group/i })[0]);
    fireEvent.change(screen.getByLabelText(/Group Name/i), {
      target: { value: 'Hiking Club' },
    });
    fireEvent.change(screen.getByLabelText(/Hobby/i), {
      target: { value: 'Hiking' },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Fun hikes' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^Create$/i }));

    await waitFor(() => expect(groupsApi.getGroups).toHaveBeenCalledTimes(2));

    const deleteButton = await screen.findByRole('button', { name: /Delete/i });
    expect(deleteButton).toBeInTheDocument();
  });
});
