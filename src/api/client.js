import axios from 'axios';

const isMock = import.meta.env.VITE_MOCK_WHATSAPP === 'true';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('__ag_jwt');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('__ag_jwt');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { apiClient, isMock };
