import axios from 'axios';

// ─── Axios API Client ────────────────────────────────────────────────────────
// All requests go through the backend. Never call WhatsApp/Meta directly.

const isMock = import.meta.env.VITE_MOCK_WHATSAPP === 'true';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  withCredentials: true, // Include httpOnly cookies for JWT
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT from memory if cookie auth unavailable
apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('__ag_jwt'); // Memory fallback only
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle 401 globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('__ag_jwt');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { apiClient, isMock };
