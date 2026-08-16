import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/shared/ui';
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.header__logo}>
        <Image fill src="/logo.svg" alt="INTERVIEW//PLATFORM" />
      </Link>

      <nav className={styles.header__nav} aria-label="Основная навигация">
        <ul className={styles.header__navList}>
          <li className={styles.header__navItem}>
            <a href="#how-it-works" className={styles.header__navLink}>
              Как это работает
            </a>
          </li>
          <li className={styles.header__navItem}>
            <a href="#features" className={styles.header__navLink}>
              Возможности
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.header__actions}>
        <ThemeSwitcher />
        <Link className={styles.header__loginBtn} href="/login">
          Войти
        </Link>
        <Button>Создать бесплатный аккаунт</Button>
      </div>
    </header>
  );
}
