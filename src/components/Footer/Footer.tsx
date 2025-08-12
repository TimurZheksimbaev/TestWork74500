'use client';

import { memo, useMemo } from 'react';
import { useAuthStore } from '@/store/authStore';
import styles from './Footer.module.scss';

export const Footer: React.FC = memo(() => {
  const { isAuthenticated, user } = useAuthStore();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.year}>© {currentYear}</span>
          {isAuthenticated && user && (
            <span className={styles.userEmail}>Logged as {user.email}</span>
          )}
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
