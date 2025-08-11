import { api } from './client.js';

export function getRecentActivities() {
  return api('/activities/recent');
}
