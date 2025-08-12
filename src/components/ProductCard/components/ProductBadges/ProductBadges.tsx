import React from 'react';
import styles from './ProductBadges.module.scss';

interface ProductBadgesProps {
  discount?: number;
  stock?: number;
}

export const ProductBadges: React.FC<ProductBadgesProps> = ({
  discount = 0,
  stock = 0,
}) => {
  const hasDiscount = discount > 0;
  const isLowStock = stock < 10 && stock > 0;

  if (!hasDiscount && !isLowStock) {
    return null;
  }

  return (
    <div className={styles.badges}>
      {hasDiscount && (
        <div className={styles.discountBadge}>-{Math.round(discount)}%</div>
      )}
      {isLowStock && (
        <div className={styles.lowStockBadge}>Осталось {stock}</div>
      )}
    </div>
  );
};
