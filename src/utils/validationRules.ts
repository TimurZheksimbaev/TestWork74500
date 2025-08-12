import { ValidationRule } from '@/hooks/useFormValidation';

// Базовые правила валидации
export const required: ValidationRule = (value: string) => {
  if (!value.trim()) {
    return 'Поле обязательно для заполнения';
  }
  return '';
};

export const minLength =
  (min: number): ValidationRule =>
  (value: string) => {
    if (value.length < min) {
      return `Минимум ${min} символа`;
    }
    return '';
  };

export const maxLength =
  (max: number): ValidationRule =>
  (value: string) => {
    if (value.length > max) {
      return `Максимум ${max} символов`;
    }
    return '';
  };

export const email: ValidationRule = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value && !emailRegex.test(value)) {
    return 'Неверный формат email';
  }
  return '';
};

// Готовые наборы правил
export const loginValidationRules = {
  username: [required, minLength(3)],
  password: [required, minLength(3)],
};
