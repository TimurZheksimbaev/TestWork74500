import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStore, LoginCredentials } from '@/types';
import { authAPI } from '@/utils/api';

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      // Состояние
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Действия
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authAPI.login(credentials);

          // Сохраняем токен в localStorage
          localStorage.setItem('token', response.token);

          // Обновляем состояние
          set({
            user: {
              id: response.id,
              username: response.username,
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
              gender: response.gender,
              image: response.image,
            },
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          const errorMessage =
            (error as any)?.response?.data?.message ||
            'Invalid credentials. Please try again.';

          set({
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false,
            user: null,
            token: null,
          });

          // Удаляем токен из localStorage при ошибке
          localStorage.removeItem('token');
        }
      },

      logout: () => {
        // Удаляем токен из localStorage
        localStorage.removeItem('token');

        // Сбрасываем состояние
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      checkAuth: () => {
        const token = localStorage.getItem('token');
        if (token) {
          set({
            token,
            isAuthenticated: true,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
