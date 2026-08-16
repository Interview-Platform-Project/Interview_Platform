'use client';

import Link from 'next/link';
import { Button } from '@/shared/ui';
import styles from './SidebarFooter.module.scss';

export default function SidebarFooter() {
  return (
    <div className={styles.root}>
      <div className={styles.user}>
        <div className={styles.name}>Иван Иванов</div>
      </div>
      <div className={styles.actions}>
        <Button as={Link} href="/settings" variant="ghost" size="sm">
          Настройки
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            console.log('logout');
          }}
        >
          Выйти
        </Button>
      </div>
    </div>
  );
}
