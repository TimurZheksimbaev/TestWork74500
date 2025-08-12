'use client';

import { useAuthStore } from '@/store/authStore';
import { useProducts } from '@/hooks';
import { ProductGrid } from '@/components';
import styles from './page.module.scss';

export default function Home() {
  const { isAuthenticated, user } = useAuthStore();
  const { products, isLoading, error, refetch } = useProducts(12);

  return (
    <div className={styles.page}>
      {isAuthenticated && user ? (
        <div className={styles.welcomeSection}>
          <div className={styles.container}>
            <div className={styles.welcomeMessage}>
              <h1 className={styles.welcomeTitle}>
                Hello, {user.firstName}! 👋
              </h1>
              <p className={styles.welcomeText}>Welcome to our online store</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.hero}>
              <h1 className={styles.title}>Welcome to our online store!</h1>
              <div className={styles.guestMessage}>
                <p>To add products to your cart, you need to log in.</p>
                <p>Click &quot;Login&quot; in the header of the site.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <ProductGrid
        products={products}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
    </div>
  );
}
