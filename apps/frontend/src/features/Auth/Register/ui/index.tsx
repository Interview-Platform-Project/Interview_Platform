'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import styles from '../../auth.module.scss';
import { registerSchemaResolver } from '../types';
import type { registerSchema as RegisterSchema } from '../types';

export function Register() {
  const { handleSubmit, control } = useForm<RegisterSchema>({
    resolver: registerSchemaResolver,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });
  const onSubmit = (data: RegisterSchema) => {
    console.log(data);
  };

  return (
    <div className={styles['auth-form']}>
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

        <Button className={styles['auth-form__button']} type="submit">
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
