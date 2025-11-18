import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('sbd-landing-auth') ?
        JSON.parse(localStorage.getItem('sbd-landing-auth')!)?.state?.accessToken : null;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 errors (token expired, etc.)
    if (error.response?.status === 401) {
      // Clear auth state on 401
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sbd-landing-auth');
        // Optionally redirect to login
        // window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;