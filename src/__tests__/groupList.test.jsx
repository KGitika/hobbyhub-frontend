import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GroupList from '../components/GroupList.jsx';
import * as groupsApi from '../api/groups.js';

describe('GroupList', () => {
  it('fetches groups by hobby and joins selected group', async () => {
    vi.spyOn(groupsApi, 'getGroups').mockResolvedValue([
      { id: 'g1', name: 'Photography Circle', hobby: 'Photography' },
      { id: 'g2', name: 'Hiking Club', hobby: 'Hiking' },
    ]);
    vi.spyOn(groupsApi, 'joinGroup').mockResolvedValue({ isMember: true });

    render(<GroupList hobbyId="Photography" />);

    // Ensure the group for the selected hobby is shown
    const joinButton = await screen.findByRole('button', { name: /Join Group/i });
    fireEvent.click(joinButton);

    await waitFor(() => expect(groupsApi.joinGroup).toHaveBeenCalledWith('g1'));
  });
});
