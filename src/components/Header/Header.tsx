'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Shop
        </Link>

        <nav className={styles.nav}>
          {isAuthenticated && user ? (
            <div className={styles.userInfo}>
              <span className={styles.userName}>
                {user.firstName} {user.lastName}
              </span>
              <button
                onClick={handleLogout}
                className={styles.logoutButton}
                type="button"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className={styles.loginLink}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
