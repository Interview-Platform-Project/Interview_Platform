import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Image fill src="/logo.svg" alt="INTERVIEW//PLATFORM" />
        </div>
        <div className={styles.copyright}>© 2026 Платформа Интервью. Все права защищены.</div>
        <ul className={styles.links}>
          <li className={styles.links__item}>
            <Link href="#">Конфиденциальность</Link>
          </li>
          <li className={styles.links__item}>
            <Link href="#">Условия</Link>
          </li>
          <li className={styles.links__item}>
            <Link href="#">Контакты</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
