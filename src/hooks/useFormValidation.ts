import { useState, useCallback } from 'react';

export type ValidationRule = (value: string) => string;

export interface ValidationRules {
  [key: string]: ValidationRule[];
}

export interface FormState {
  [key: string]: string;
}

export interface TouchedState {
  [key: string]: boolean;
}

export interface ErrorsState {
  [key: string]: string;
}

export const useFormValidation = <T extends FormState>(
  initialValues: T,
  validationRules: ValidationRules
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ErrorsState>({});
  const [touched, setTouched] = useState<TouchedState>({});

  // Валидация одного поля
  const validateField = useCallback(
    (fieldName: string, value: string): string => {
      const rules = validationRules[fieldName];
      if (!rules) return '';

      for (const rule of rules) {
        const error = rule(value);
        if (error) return error;
      }
      return '';
    },
    [validationRules]
  );

  // Валидация всей формы
  const validateForm = useCallback((): boolean => {
    const newErrors: ErrorsState = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName] || '');
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField, validationRules]);

  // Обработка изменения поля
  const handleChange = useCallback(
    (fieldName: string, value: string) => {
      setValues(prev => ({ ...prev, [fieldName]: value }));

      // Валидация поля при изменении, если оно уже было затронуто
      if (touched[fieldName]) {
        const fieldError = validateField(fieldName, value);
        setErrors(prev => ({ ...prev, [fieldName]: fieldError }));
      }
    },
    [touched, validateField]
  );

  // Обработка потери фокуса
  const handleBlur = useCallback(
    (fieldName: string, value: string) => {
      setTouched(prev => ({ ...prev, [fieldName]: true }));
      const fieldError = validateField(fieldName, value);
      setErrors(prev => ({ ...prev, [fieldName]: fieldError }));
    },
    [validateField]
  );

  // Сброс формы
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Установка всех полей как затронутых (для submit)
  const touchAllFields = useCallback(() => {
    const allTouched: TouchedState = {};
    Object.keys(validationRules).forEach(fieldName => {
      allTouched[fieldName] = true;
    });
    setTouched(allTouched);
  }, [validationRules]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    touchAllFields,
    setValues,
  };
};
