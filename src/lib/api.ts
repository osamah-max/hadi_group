// src/lib/api.ts
import axios from 'axios';

// في التطوير، استخدم الـ proxy من vite.config.ts (baseURL = '')
// في الإنتاج، استخدم VITE_API_URL من .env
const isDev = import.meta.env.DEV;
const API_URL = import.meta.env.VITE_API_URL || (isDev ? '' : 'http://localhost:3000');

/** Backend origin for building absolute URLs (e.g. /uploads/...) */
export const API_ORIGIN = import.meta.env.VITE_API_URL || (isDev ? 'http://localhost:3000' : window.location.origin);

const api = axios.create({
  baseURL: API_URL || '', // في التطوير، استخدم proxy (baseURL فارغ)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network error - Make sure the backend server is running on http://localhost:3000');
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/#/admin/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Resolve asset/image URL for use in <img src={...}>.
 * Use for product images, factory logos, hero images, etc.
 * - /uploads/... → backend origin (served by API server)
 * - /assets/... or assets/... → same origin (served by Vite/public); prepends base when set (e.g. /hadi_group/)
 * - Full http(s) URLs → unchanged
 */
export function getProductImageUrl(img: string | null | undefined): string {
  if (!img) return '';
  if (/^https?:\/\//i.test(img)) return img;
  if (img.startsWith('/uploads/')) return `${API_ORIGIN}${img}`;
  if (img.startsWith('assets/') && !img.startsWith('/')) img = '/' + img;
  const base = import.meta.env.BASE_URL;
  if (base && base !== '/') return (base.endsWith('/') ? base.slice(0, -1) : base) + img;
  return img;
}

export default api;
