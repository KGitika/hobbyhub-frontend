import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HobbySelector from '../pages/HobbySelector.jsx';
import * as usersApi from '../api/users.js';
import { AuthContext } from '../context/AuthContext.jsx';

describe('HobbySelector', () => {
  it('saves interests', async () => {
    vi.spyOn(usersApi, 'updateUserHobbies').mockResolvedValue({ ok: true });
    vi.spyOn(usersApi, 'getUserHobbies').mockResolvedValue([]);
    const setUser = vi.fn();
    render(
      <AuthContext.Provider value={{ user: { id: 'u', interests: [] }, setUser }}>
        <MemoryRouter>
          <HobbySelector />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const hobby = await screen.findByText('Photography');
    fireEvent.click(hobby);
    fireEvent.click(screen.getByText('Continue to Dashboard'));
    await waitFor(() => expect(usersApi.updateUserHobbies).toHaveBeenCalled());
  });
});
