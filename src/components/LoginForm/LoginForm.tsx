'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useFormValidation } from '@/hooks';
import { FormField, LoadingButton, ErrorMessage } from '@/components/UI';
import { loginValidationRules } from '@/utils/validationRules';
import styles from './LoginForm.module.scss';

export const LoginForm: React.FC = () => {
  const { login, isLoading, error, clearError, isAuthenticated } =
    useAuthStore();
  const router = useRouter();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    touchAllFields,
  } = useFormValidation({ username: '', password: '' }, loginValidationRules);

  // Очистка серверной ошибки при изменении полей
  const handleFieldChange = (name: string, value: string) => {
    handleChange(name, value);
    if (error) {
      clearError();
    }
  };

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    touchAllFields();

    if (!validateForm()) {
      return;
    }

    await login(values);
  };

  // Редирект после успешной авторизации
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Login to the system</h1>

      <ErrorMessage message={error || ''} />

      <FormField
        label="Username"
        name="username"
        type="text"
        value={values.username}
        placeholder="Enter your username"
        error={errors.username}
        touched={touched.username}
        disabled={isLoading}
        onChange={handleFieldChange}
        onBlur={handleBlur}
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        value={values.password}
        placeholder="Enter your password"
        error={errors.password}
        touched={touched.password}
        disabled={isLoading}
        onChange={handleFieldChange}
        onBlur={handleBlur}
      />

      <LoadingButton
        type="submit"
        isLoading={isLoading}
        loadingText="Login..."
        disabled={isLoading}
      >
        Login
      </LoadingButton>
    </form>
  );
};
