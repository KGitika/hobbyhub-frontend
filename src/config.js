// export const API_BASE_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:8080'
//     : 'https://hobbyhub-vbid.onrender.com';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';