import React from 'react';
import styles from './ErrorMessage.module.scss';

type MessageType = 'error' | 'warning' | 'info' | 'success';

interface ErrorMessageProps {
  message: string;
  type?: MessageType;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type = 'error',
  className = '',
}) => {
  if (!message) return null;

  const messageClasses = [
    styles.errorMessage,
    type !== 'error' ? styles[type] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={messageClasses}>{message}</div>;
};
