import { api } from './client.js';

function normalizeEvent(event) {
  if (!event) return event;
  return { ...event, isRsvped: event.isRsvped ?? event.rsvped };
}

function normalizeRsvp(data) {
  return { isRsvped: data?.isRsvped ?? data?.rsvped };
}

export function getEvents() {
  return api('/events').then((events) => (events ?? []).map(normalizeEvent));
}

export function createEvent(data) {
  return api('/events', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(normalizeEvent);
}

export function rsvpEvent(id) {
  return api(`/events/${id}/rsvp`, { method: 'POST' }).then(normalizeRsvp);
}

export function unrsvpEvent(id) {
  return api(`/events/${id}/rsvp`, { method: 'DELETE' }).then(normalizeRsvp);
}

export { normalizeEvent };
