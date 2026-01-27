// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import api from '../lib/api';

export interface User {
  id: number;
  email: string;
  name?: string;
  role: 'admin' | 'editor' | 'viewer';
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const response = await api.get('/api/admin/auth/me');
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('admin_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.post('/api/admin/auth/login', { email, password });
      localStorage.setItem('admin_token', response.data.token);
      setUser(response.data.user);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed',
      };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token');
    setUser(null);
    window.location.href = '/#/admin/login';
  }, []);

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
