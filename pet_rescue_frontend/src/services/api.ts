import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';
export const MEDIA_BASE_URL = API_BASE_URL.replace('/api/v1', '');

/**
 * Ensures the image URL is absolute and handles missing images with a fallback.
 */
export const formatImageUrl = (url: string | null | undefined, fallback: string = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=70') => {
  if (!url) return fallback;
  if (url.startsWith('http')) return url;
  // If the path doesn't start with / and MEDIA_BASE_URL doesn't end with /, add a /
  const separator = url.startsWith('/') ? '' : '/';
  return `${MEDIA_BASE_URL}${separator}${url}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Guest / session expired.
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
