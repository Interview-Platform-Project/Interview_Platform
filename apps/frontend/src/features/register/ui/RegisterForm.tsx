'use client';

import { useQueryClient } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { registerRequest, SESSION_QUERY_KEY } from '@/entities/session';
import { ApiError } from '@/shared/api';
import formStyles from '@/shared/ui/AuthForm/auth-form.module.scss';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { registerSchemaResolver, type RegisterFormValues } from '../model/register-schema';

export function RegisterForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { handleSubmit, control } = useForm<RegisterFormValues>({
    resolver: registerSchemaResolver,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const { name, email, password } = data;
    setIsLoading(true);
    setServerError(null);

    try {
      const response = await registerRequest({ name, email, password });

      if (response?.user) {
        queryClient.setQueryData(SESSION_QUERY_KEY, response);
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
    <div className={formStyles['auth-form']}>
      <header className={formStyles['auth-form__header']}>
        <h2>Регистрация</h2>
        <p>Присоединяйтесь к платформе</p>
      </header>

      <form className={formStyles['auth-form__form']} onSubmit={handleSubmit(onSubmit)}>
        <div className={formStyles['auth-form__fields']}>
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

        {serverError && <p className={formStyles['auth-form__server-error']}>{serverError}</p>}

        <Button className={formStyles['auth-form__button']} type="submit" isLoading={isLoading}>
          Создать аккаунт
          <ArrowRight aria-hidden size={16} />
        </Button>

        <p className={formStyles['auth-form__legal']}>
          Создавая аккаунт, вы соглашаетесь с нашими{' '}
          <Link href="/terms">Условиями использования</Link> и{' '}
          <Link href="/privacy">Политикой конфиденциальности</Link>.
        </p>
      </form>

      <p className={formStyles['auth-form__footer']}>
        Уже есть аккаунт? <Link href="/login">Войти</Link>
      </p>
    </div>
  );
}
