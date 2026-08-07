import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Input } from '@/shared/ui/Input';
import styles from '../../auth.module.scss';

export function Login() {
  return (
    <div className={styles['auth-form']}>
      <header className={styles['auth-form__header']}>
        <h2>Вход</h2>
        <p>Вернуться в рабочую среду</p>
      </header>

      <form className={styles['auth-form__form']}>
        <div className={styles['auth-form__fields']}>
          <Input type="email" placeholder="alex@example.com">
            Email адрес
          </Input>
          <Input type="password" placeholder="••••••••">
            Пароль
          </Input>
          <Checkbox id="remember">Запомнить меня на 30 дней</Checkbox>
        </div>

        <Button className={styles['auth-form__button']} type="submit">
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
