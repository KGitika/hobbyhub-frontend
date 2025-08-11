import { api } from './client.js';

let hobbiesCache = null;

export async function getHobbies() {
  if (hobbiesCache) return hobbiesCache;
  hobbiesCache = await api('/hobbies');
  return hobbiesCache;
}
