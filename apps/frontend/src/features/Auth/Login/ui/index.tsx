'use client';

import { useQueryClient } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ApiError, apiRequest } from '@/shared/api';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Input } from '@/shared/ui/Input';
import styles from '../../auth.module.scss';
import { loginSchemaResolver } from '../types';
import type { LoginResponse, LoginSchema } from '../types';
import loginStyles from './login.module.scss';

export function Login() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { handleSubmit, control } = useForm<LoginSchema>({
    resolver: loginSchemaResolver,
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    const { email, password } = data;
    setIsLoading(true);
    setServerError(null);

    try {
      const response = await apiRequest<LoginResponse>({
        url: '/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
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
        setServerError('Не удалось войти. Попробуйте ещё раз.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles['auth-form']}>
      {isLoading && <div className={styles['auth-form__loading']}>Загрузка...</div>}
      <header className={styles['auth-form__header']}>
        <h2>Вход</h2>
        <p>Вернуться в рабочую среду</p>
      </header>

      <form className={styles['auth-form__form']} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['auth-form__fields']}>
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

          <div className={loginStyles.login__options}>
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="remember"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                >
                  Запомнить меня на 30 дней
                </Checkbox>
              )}
            />
            <Link className={loginStyles.login__forgot} href="/forgot-password">
              Забыли пароль?
            </Link>
          </div>
        </div>

        {serverError && <p className={styles['auth-form__server-error']}>{serverError}</p>}

        <Button className={styles['auth-form__button']} type="submit" isLoading={isLoading}>
          Войти
          <ArrowRight aria-hidden size={16} />
        </Button>
      </form>

      <p className={styles['auth-form__footer']}>
        Нет аккаунта? <Link href="/register">Создать аккаунт</Link>
      </p>
    </div>
  );
}
