import axios from 'axios';

const LOCAL_API_BASE_URL = 'http://localhost:3000/api';

const resolveApiBaseUrl = () => {
  const envApiUrl = (
    process.env.REACT_APP_API_URL ||
    process.env.REACT_APP_API_BASE_URL ||
    ''
  ).trim();

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const isLocalFrontend = host === 'localhost' || host === '127.0.0.1';

    // Prevent stale LAN IP config from breaking local development sessions.
    if (isLocalFrontend) {
      return LOCAL_API_BASE_URL;
    }
  }

  return envApiUrl || LOCAL_API_BASE_URL;
};

const API_BASE_URL = resolveApiBaseUrl();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  try {
    const authData = localStorage.getItem('auth-storage');
    if (authData) {
      const { state } = JSON.parse(authData);
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    }
  } catch (parseError) {
    localStorage.removeItem('auth-storage');
  }

  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth and redirect to login
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
  
  getProfile: () =>
    apiClient.get('/auth/profile'),
  
  updateProfile: (data) =>
    apiClient.patch('/auth/profile', data),
  
  changePassword: (data) =>
    apiClient.patch('/auth/change-password', data),
};

export const dashboardAPI = {
  getStats: () =>
    apiClient.get('/dashboard/stats'),
};

export default apiClient;
