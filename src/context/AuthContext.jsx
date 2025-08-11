/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, getMe } from '../api/auth.js';
import { setToken as setClientToken, getToken as getClientToken } from '../api/client.js';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bootstrap();
  }, []);

  async function bootstrap() {
    const stored = getClientToken();
    if (stored) {
      setTokenState(stored);
      try {
        const me = await getMe();
        setUser(me);
      } catch {
        setClientToken(null);
        setTokenState(null);
      }
    }
    setLoading(false);
  }

  async function login(credentials) {
    const data = await apiLogin(credentials);
    setTokenState(data.token);
    setUser(data.user);
    setClientToken(data.token);
    return data;
  }

  function logout() {
    setTokenState(null);
    setUser(null);
    setClientToken(null);
  }

  const value = { token, user, login, logout, bootstrap, loading, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
