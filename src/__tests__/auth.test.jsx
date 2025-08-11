import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext.jsx';
import * as authApi from '../api/auth.js';

describe('AuthProvider', () => {
  it('handles login and logout', async () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    vi.spyOn(authApi, 'login').mockResolvedValue({ token: 't', user: { id: 'u' } });
    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await result.current.login({ email: 'a', password: 'b' });
    });
    expect(result.current.token).toBe('t');
    act(() => result.current.logout());
    expect(result.current.token).toBe(null);
  });
});
