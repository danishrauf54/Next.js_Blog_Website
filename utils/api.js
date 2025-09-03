import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Request/Response interceptors (basic)
api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err?.response?.data?.message || err.message || 'Request failed';
    return Promise.reject(new Error(msg));
  }
);

export default api;
