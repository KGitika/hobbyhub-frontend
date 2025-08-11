import { api } from './client.js';
import { normalizeEvent } from './events.js';

export function getGroup(id) {
  return api(`/groups/${id}`).then((group) => ({
    ...group,
    upcomingEvents: (group.upcomingEvents ?? []).map(normalizeEvent),
  }));
}

export function getGroups() {
  return api('/groups').then((groups) =>
    (groups ?? []).map((g) => ({
      ...g,
      upcomingEvents: (g.upcomingEvents ?? []).map(normalizeEvent),
    }))
  );
}

export function createGroup(data) {
  return api('/groups', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function joinGroup(id) {
  return api(`/groups/${id}/join`, { method: 'POST' });
}

export function leaveGroup(id) {
  return api(`/groups/${id}/leave`, { method: 'DELETE' });
}

export function deleteGroup(id) {
  return api(`/groups/${id}`, { method: 'DELETE' });
}
