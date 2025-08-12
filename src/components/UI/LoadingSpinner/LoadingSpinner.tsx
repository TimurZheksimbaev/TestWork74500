import React from 'react';
import styles from './LoadingSpinner.module.scss';

type SpinnerSize = 'small' | 'medium' | 'large';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  text?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  text = 'Загрузка...',
  className = '',
}) => {
  const containerClasses = [
    styles.container,
    size !== 'medium' ? styles[size] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <div className={styles.spinner}></div>
      {text && <div className={styles.text}>{text}</div>}
    </div>
  );
};
