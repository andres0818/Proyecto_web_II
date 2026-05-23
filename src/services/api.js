import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Update if the backend uses a different port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally, add interceptors here if needed for authentication tokens later.

export default api;
