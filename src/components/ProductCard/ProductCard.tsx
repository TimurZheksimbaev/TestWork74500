import React, { memo } from 'react';
import { Product } from '@/types';
import { useAuthStore } from '@/store/authStore';
import {
  ProductBadges,
  ProductImage,
  ProductRating,
  ProductPrice,
} from './components';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const { isAuthenticated } = useAuthStore();

  const handleAddToCart = () => {};

  return (
    <div className={styles.card}>
      <ProductImage src={product.thumbnail} alt={product.title}>
        <ProductBadges
          discount={product.discountPercentage}
          stock={product.stock}
        />
      </ProductImage>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.category}>{product.category}</div>
          {product.brand && <div className={styles.brand}>{product.brand}</div>}
        </div>

        <h3 className={styles.title}>{product.title}</h3>

        <ProductRating rating={product.rating} />

        <div className={styles.priceWrapper}>
          <ProductPrice
            price={product.price}
            discountPercentage={product.discountPercentage}
          />
        </div>
      </div>

      {isAuthenticated && (
        <div className={styles.actions}>
          <button
            className={`${styles.addToCartButton} ${
              product.stock === 0 ? styles.outOfStock : ''
            }`}
            onClick={handleAddToCart}
            type="button"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
          </button>
        </div>
      )}
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
