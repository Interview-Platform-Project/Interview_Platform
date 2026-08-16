'use client';

import { useQueryClient } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ApiError, apiRequest } from '@/shared/api';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import styles from '../../auth.module.scss';
import { registerSchemaResolver } from '../types';
import type {
  registerSchema as RegisterSchema,
  registerResponse as RegisterResponse,
} from '../types';

export function Register() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { handleSubmit, control } = useForm<RegisterSchema>({
    resolver: registerSchemaResolver,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    const { name, email, password } = data;
    setIsLoading(true);
    setServerError(null);

    try {
      const response = await apiRequest<RegisterResponse>({
        url: '/auth/register',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        skipRefresh: true,
      });

      if (response?.user) {
        queryClient.setQueryData(['me'], response);
        router.push('/home');
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setServerError(error.message);
      } else {
        setServerError('Не удалось создать аккаунт. Попробуйте ещё раз.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles['auth-form']}>
      {isLoading && <div className={styles['auth-form__loading']}>Загрузка...</div>}
      <header className={styles['auth-form__header']}>
        <h2>Регистрация</h2>
        <p>Присоединяйтесь к платформе</p>
      </header>

      <form className={styles['auth-form__form']} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['auth-form__fields']}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="text"
                placeholder="Алекс Разработчик"
                errorText={fieldState.error?.message}
              >
                Полное имя
              </Input>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="email"
                placeholder="alex@example.com"
                errorText={fieldState.error?.message}
              >
                Email адрес
              </Input>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="password"
                placeholder="••••••••"
                errorText={fieldState.error?.message}
              >
                Пароль
              </Input>
            )}
          />
          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="password"
                placeholder="••••••••"
                errorText={fieldState.error?.message}
              >
                Подтверждение пароля
              </Input>
            )}
          />
        </div>

        {serverError && <p className={styles['auth-form__server-error']}>{serverError}</p>}

        <Button className={styles['auth-form__button']} type="submit" isLoading={isLoading}>
          Создать аккаунт
          <ArrowRight aria-hidden size={16} />
        </Button>

        <p className={styles['auth-form__legal']}>
          Создавая аккаунт, вы соглашаетесь с нашими{' '}
          <Link href="/terms">Условиями использования</Link> и{' '}
          <Link href="/privacy">Политикой конфиденциальности</Link>.
        </p>
      </form>

      <p className={styles['auth-form__footer']}>
        Уже есть аккаунт? <Link href="/login">Войти</Link>
      </p>
    </div>
  );
}
