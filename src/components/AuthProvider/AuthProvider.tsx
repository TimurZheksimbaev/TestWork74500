'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Проверяем авторизацию при загрузке приложения
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
};
