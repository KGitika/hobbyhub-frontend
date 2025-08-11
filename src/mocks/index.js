import userData from './user.json';
import groups from './groups.json';
import activities from './activities.json';
import hobbies from './hobbies.json';

let currentUser = { ...userData };

function delay() {
  return new Promise((r) => setTimeout(r, 100));
}

export async function handleRequest(path, opts = {}) {
  await delay();
  const method = (opts.method || 'GET').toUpperCase();

  if (path === '/auth/login' && method === 'POST') {
    return { token: 'mock-token', user: currentUser };
  }
  if (path === '/auth/signup' && method === 'POST') {
    return { id: 'u_new' };
  }
  if (path === '/users/me') {
    return currentUser;
  }
  const userHobbiesMatch = path.match(/\/users\/([^/]+)\/hobbies/);
  if (userHobbiesMatch && method === 'GET') {
    return currentUser.interests;
  }
  if (userHobbiesMatch && method === 'POST') {
    const body = JSON.parse(opts.body || '{}');
    currentUser = { ...currentUser, interests: body.hobbies };
    return { ok: true };
  }
  if (path === '/dashboard/summary') {
    return {
      interestedHobbiesCount: currentUser.interests.length,
      joinedGroupsCount: 5,
      upcomingEventsCount: 12,
      newConnectionsCount: 28,
    };
  }
  if (path === '/recommendations/groups') {
    return [
      { groupId: 'g_archery', name: 'Archery Club', matchPct: 95, hobby: 'Archery' },
      { groupId: 'g_swim', name: 'Swimming Group', matchPct: 88, hobby: 'Swimming' },
      { groupId: 'g_write', name: 'Creative Writing', matchPct: 92, hobby: 'Writing' }
    ];
  }
  if (path === '/activities/recent') {
    return activities;
  }
  if (path === '/hobbies') {
    return hobbies;
  }
  if (path === '/events' && method === 'GET') {
    return Object.values(groups)
      .filter((g) => g.isMember)
      .flatMap((g) => g.upcomingEvents);
  }
  if (path === '/events' && method === 'POST') {
    const body = JSON.parse(opts.body || '{}');
    const { groupId, title, dateIso, location } = body;
    const group = groups[groupId];
    if (!group || !group.isMember) {
      throw new Error('Cannot create event for this group');
    }
    const id = body.id || `e_${Date.now()}`;
    const newEvent = { id, groupId, title, dateIso, location, isRsvped: false };
    group.upcomingEvents.push(newEvent);
    return newEvent;
  }
  if (path === '/groups' && method === 'GET') {
    return Object.values(groups);
  }
  if (path === '/groups' && method === 'POST') {
    const body = JSON.parse(opts.body || '{}');
    const id = body.id || `g_${Date.now()}`;
    const newGroup = { id, name: body.name, hobby: body.hobby, description: body.description, isMember: true, upcomingEvents: [] };
    groups[id] = newGroup;
    return newGroup;
  }
  const groupMatch = path.match(/\/groups\/([^/]+)/);
  if (groupMatch && !path.includes('/join') && !path.includes('/leave')) {
    const id = groupMatch[1];
    return groups[id];
  }
  const joinMatch = path.match(/\/groups\/([^/]+)\/join/);
  if (joinMatch) {
    const id = joinMatch[1];
    groups[id].isMember = true;
    return { isMember: true };
  }
  const leaveMatch = path.match(/\/groups\/([^/]+)\/leave/);
  if (leaveMatch) {
    const id = leaveMatch[1];
    groups[id].isMember = false;
    return { isMember: false };
  }
  const rsvpMatch = path.match(/\/events\/([^/]+)\/rsvp/);
  if (rsvpMatch && method === 'POST') {
    const id = rsvpMatch[1];
    Object.values(groups).forEach((g) => g.upcomingEvents.forEach((e) => { if (e.id === id) e.isRsvped = true; }));
    return { isRsvped: true };
  }
  if (rsvpMatch && method === 'DELETE') {
    const id = rsvpMatch[1];
    Object.values(groups).forEach((g) => g.upcomingEvents.forEach((e) => { if (e.id === id) e.isRsvped = false; }));
    return { isRsvped: false };
  }

  throw new Error(`Mock path not implemented: ${method} ${path}`);
}
