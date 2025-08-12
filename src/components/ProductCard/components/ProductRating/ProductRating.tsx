import React from 'react';
import styles from './ProductRating.module.scss';

interface ProductRatingProps {
  rating: number;
  showValue?: boolean;
}

export const ProductRating: React.FC<ProductRatingProps> = ({
  rating,
  showValue = true,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className={styles.star}>
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className={styles.starHalf}>
          ★
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className={styles.starEmpty}>
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className={styles.rating}>
      <div className={styles.stars}>{renderStars(rating)}</div>
      {showValue && (
        <span className={styles.ratingValue}>({rating.toFixed(1)})</span>
      )}
    </div>
  );
};
