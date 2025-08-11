import { api } from './client.js';

const userHobbiesCache = new Map();

export async function getUserHobbies(id) {
  if (userHobbiesCache.has(id)) return userHobbiesCache.get(id);
  const data = await api(`/users/${id}/hobbies`);
  userHobbiesCache.set(id, data);
  return data;
}

export async function updateUserHobbies(id, hobbies) {
  const res = await api(`/users/${id}/hobbies`, {
    method: 'POST',
    body: JSON.stringify({ hobbies }),
  });
  userHobbiesCache.set(id, hobbies);
  return res;
}
