'use client';

import { useQueryClient } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { loginRequest, SESSION_QUERY_KEY } from '@/entities/session';
import { ApiError } from '@/shared/api';
import formStyles from '@/shared/ui/AuthForm/auth-form.module.scss';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Input } from '@/shared/ui/Input';
import { loginSchemaResolver, type LoginFormValues } from '../model/login-schema';
import styles from './login-form.module.scss';

export function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { handleSubmit, control } = useForm<LoginFormValues>({
    resolver: loginSchemaResolver,
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const { email, password } = data;
    setIsLoading(true);
    setServerError(null);

    try {
      const response = await loginRequest({ email, password });

      if (response?.user) {
        queryClient.setQueryData(SESSION_QUERY_KEY, response);
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
    <div className={formStyles['auth-form']}>
      <header className={formStyles['auth-form__header']}>
        <h2>Вход</h2>
        <p>Вернуться в рабочую среду</p>
      </header>

      <form className={formStyles['auth-form__form']} onSubmit={handleSubmit(onSubmit)}>
        <div className={formStyles['auth-form__fields']}>
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

          <div className={styles['login-form__options']}>
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
            <Link className={styles['login-form__forgot']} href="/forgot-password">
              Забыли пароль?
            </Link>
          </div>
        </div>

        {serverError && <p className={formStyles['auth-form__server-error']}>{serverError}</p>}

        <Button className={formStyles['auth-form__button']} type="submit" isLoading={isLoading}>
          Войти
          <ArrowRight aria-hidden size={16} />
        </Button>
      </form>

      <p className={formStyles['auth-form__footer']}>
        Нет аккаунта? <Link href="/register">Создать аккаунт</Link>
      </p>
    </div>
  );
}
