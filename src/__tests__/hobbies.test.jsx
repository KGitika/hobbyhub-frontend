import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Hobbies from '../pages/Hobbies.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import * as hobbiesApi from '../api/hobbies.js';
import * as usersApi from '../api/users.js';

describe('Hobbies page', () => {
  it('shows joined and available hobbies', async () => {
    vi.spyOn(hobbiesApi, 'getHobbies').mockResolvedValue([
      { id: '1', name: 'Photography', emoji: '📸' },
      { id: '2', name: 'Gardening', emoji: '🌱' },
    ]);
    vi.spyOn(usersApi, 'getUserHobbies').mockResolvedValue([{ id: '1' }]);

    render(
      <AuthContext.Provider value={{ user: { id: 'u', interests: [] }, setUser: vi.fn() }}>
        <MemoryRouter>
          <Hobbies />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await screen.findByText('Your Hobbies');
    const photoTile = screen.getByText('Photography').closest('button');
    const gardenTile = screen.getByText('Gardening').closest('button');
    expect(photoTile).toHaveClass('selected');
    expect(gardenTile).not.toHaveClass('selected');
  });
});
