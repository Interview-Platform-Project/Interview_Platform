import Image from 'next/image';
import Link from 'next/link';
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher';
import styles from './authInfo.module.scss';

interface AuthInfoProps {
  children?: React.ReactNode;
}

export function AuthInfo({ children }: AuthInfoProps) {
  return (
    <>
      <div className={styles['auth-info']}>
        <header className={styles.auth__header}>
          <Link href="/">
            {' '}
            <Image src="/logo.svg" alt="Logo:Interview Platform" width={217} height={18} />
          </Link>
          <ThemeSwitcher />
        </header>
        <div className={styles['auth-info__description']}>
          <h1>Современная рабочая среда для технических интервью.</h1>
          <p>
            Живое общение, совместное написание кода, ИИ-подсказки и структурированная обратная
            связь — всё в единой среде.
          </p>
          <ul className={styles['auth-info__features']}>
            <li>Никакого переключения контекста</li>
            <li>Встроенная IDE и терминал</li>
            <li>Структурированная оценка и аналитика</li>
          </ul>
        </div>
        <p className={styles['auth-info__copyright']}>
          © {new Date().getFullYear()} Платформа Интервью.
        </p>
      </div>
      {children && <div className={styles['auth-form']}>{children}</div>}
    </>
  );
}
