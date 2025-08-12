import React from 'react';
import styles from './FormField.module.scss';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'password' | 'email';
  value: string;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string, value: string) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  error,
  touched,
  disabled = false,
  onChange,
  onBlur,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(name, e.target.value);
  };

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${styles.input} ${error ? styles.error : ''}`}
        disabled={disabled}
        placeholder={placeholder}
      />
      {touched && error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};
