'use client';

import { useAuthStore } from '@/store/authStore';
import styles from './page.module.scss';

export default function Home() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Добро пожаловать в наш магазин!</h1>

          {isAuthenticated && user ? (
            <div className={styles.welcomeMessage}>
              <p>Привет, {user.firstName}! 👋</p>
              <p>Здесь скоро будет каталог товаров.</p>
            </div>
          ) : (
            <div className={styles.guestMessage}>
              <p>Для просмотра товаров необходимо авторизоваться.</p>
              <p>Нажмите &quot;Login&quot; в шапке сайта.</p>
            </div>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.infoCard}>
            <h3>🛍️ Каталог товаров</h3>
            <p>12 товаров с изображениями, названиями, категориями и ценами</p>
          </div>

          <div className={styles.infoCard}>
            <h3>🔐 Авторизация</h3>
            <p>Безопасная авторизация с использованием JWT токенов</p>
          </div>

          <div className={styles.infoCard}>
            <h3>📱 Адаптивность</h3>
            <p>Корректное отображение на всех устройствах</p>
          </div>
        </div>
      </div>
    </div>
  );
}
