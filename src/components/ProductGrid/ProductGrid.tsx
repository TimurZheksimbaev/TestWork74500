import React, { memo, useMemo, useCallback } from 'react';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { LoadingSpinner } from '@/components/UI';
import styles from './ProductGrid.module.scss';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = memo(
  ({ products, isLoading, error, onRetry }) => {
    const productsElements = useMemo(
      () =>
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        )),
      [products]
    );

    const handleRetry = useCallback(() => {
      onRetry?.();
    }, [onRetry]);

    if (isLoading) {
      return (
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <LoadingSpinner size="large" text="Loading products..." />
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <h3 className={styles.errorTitle}>Error loading products</h3>
            <p className={styles.errorMessage}>{error}</p>
            {onRetry && (
              <button
                className={styles.retryButton}
                onClick={handleRetry}
                type="button"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className={styles.container}>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🛍️</div>
            <h3 className={styles.emptyTitle}>Products not found</h3>
            <p className={styles.emptyMessage}>
              At the moment, products are not available
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our products</h2>
        </div>

        <div className={styles.grid}>{productsElements}</div>
      </div>
    );
  }
);

ProductGrid.displayName = 'ProductGrid';
