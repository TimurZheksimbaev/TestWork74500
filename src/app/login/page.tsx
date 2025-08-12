'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { LoginForm } from '@/components/LoginForm';
import styles from './page.module.scss';

export default function LoginPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Если пользователь уже авторизован, перенаправляем на главную
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Не показываем страницу если пользователь уже авторизован
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </div>
  );
}
