import React from 'react';
import styles from './LoadingButton.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface LoadingButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  isLoading = false,
  loadingText = 'Загрузка...',
  disabled = false,
  onClick,
  className = '',
}) => {
  const buttonClasses = [
    styles.button,
    variant !== 'primary' ? styles[variant] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          {loadingText}
        </div>
      ) : (
        children
      )}
    </button>
  );
};
