import { api } from './client.js';

export function login(data) {
  return api('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function signup(data) {
  return api('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getMe() {
  return api('/users/me');
}
