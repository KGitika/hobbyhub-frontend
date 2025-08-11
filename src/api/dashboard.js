import { api } from './client.js';

export function getSummary() {
  return api('/dashboard/summary');
}
