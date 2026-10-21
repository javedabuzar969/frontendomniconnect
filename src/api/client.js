import axios from 'axios';

const isMock = import.meta.env.VITE_MOCK_WHATSAPP === 'true';

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && !envUrl.includes('localhost')) {
    return envUrl;
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://backendomniconnect.vercel.app';
  }
  return envUrl || 'http://localhost:5000';
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  let token = null;
  try {
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('__oc_token') || sessionStorage.getItem('__ag_jwt');
    }
  } catch {
    token = null;
  }
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.status === 401) {
      try {
        localStorage.removeItem('__oc_token');
        sessionStorage.removeItem('__ag_jwt');
      } catch {}
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { apiClient, isMock };
