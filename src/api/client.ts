import axios from 'axios';

// ─── Axios API Client ────────────────────────────────────────────────────────
// All requests go through the backend. Never call WhatsApp/Meta directly.

const isMock = import.meta.env.VITE_MOCK_WHATSAPP === 'true';

const getBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && !envUrl.includes('localhost')) {
    return envUrl;
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://backendomniconnect-erv8.vercel.app';
  }
  return envUrl || 'http://localhost:5000';
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
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
