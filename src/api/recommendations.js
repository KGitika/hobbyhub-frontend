import { api } from './client.js';

export function getGroupRecommendations() {
  return api('/recommendations/groups');
}
