import React from 'react';
import styles from './ProductPrice.module.scss';

interface ProductPriceProps {
  price: number;
  discountPercentage?: number;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  discountPercentage = 0,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  const hasDiscount = discountPercentage > 0;
  const discountedPrice = hasDiscount
    ? calculateDiscountedPrice(price, discountPercentage)
    : price;

  return (
    <div className={styles.priceContainer}>
      {hasDiscount ? (
        <>
          <div className={styles.priceDiscounted}>
            {formatPrice(discountedPrice)}
          </div>
          <div className={styles.priceOriginal}>{formatPrice(price)}</div>
        </>
      ) : (
        <div className={styles.price}>{formatPrice(price)}</div>
      )}
    </div>
  );
};
