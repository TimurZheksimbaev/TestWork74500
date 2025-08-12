'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProductImage.module.scss';

interface ProductImageProps {
  src: string;
  alt: string;
  children?: React.ReactNode; // для бейджей
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  children,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={styles.imageContainer}>
      {children}
      {!imageError ? (
        <Image
          src={src}
          alt={alt}
          width={300}
          height={200}
          className={styles.image}
          onError={handleImageError}
          priority={false}
        />
      ) : (
        <div className={styles.imagePlaceholder}>Image not available</div>
      )}
    </div>
  );
};
