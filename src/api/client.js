const BASE =
  import.meta.env.MODE === 'test'
    ? 'mock'
    : import.meta.env.VITE_API_BASE_URL;

if (!BASE) {
  throw new Error('VITE_API_BASE_URL is not defined');
}

async function mockApi(path, opts = {}) {
  // simple mock handler using modules in /src/mocks
  const { handleRequest } = await import('../mocks/index.js');
  return handleRequest(path, opts);
}

let authToken = null;

export function setToken(token) {
  authToken = token;
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}

export function getToken() {
  return authToken || localStorage.getItem('token');
}

export async function api(path, opts = {}) {
  if (BASE === 'mock') {
    return mockApi(path, opts);
  }
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(opts.headers || {}),
  };

  const res = await fetch(`${BASE}${path}`, { ...opts, headers });
  if (!res.ok) {
    let message = "Something went wrong...";
    try {
      const body = await res.text();
      if (body) {
        try {
          const data = JSON.parse(body);
          message = data.message || data.error || message;
        } catch {
          message = body;
        }
      }
    } catch {
      // ignore parsing errors
    }
    if (res.status >= 500) {
      message = "Something went wrong...";
    }
    throw new Error(message);
  }
  return res.status === 204 ? null : res.json();
}
