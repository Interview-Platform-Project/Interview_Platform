'use client';

import { Settings, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/shared/ui';
import styles from './SidebarFooter.module.scss';

export default function SidebarFooter() {
  const pathname = usePathname();

  return (
    <div className={styles.root}>
      <div className={styles.userRow}>
        <div className={styles.avatar} aria-hidden>
          {/* @todo add avatar image */}
          <User size={20} />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.name}>Алекс Р.</div>
          <div className={styles.sub}>Pro Подписка</div>
        </div>
      </div>

      <nav className={styles.menu} aria-label="sidebar footer menu">
        <Button
          variant={pathname === '/settings' ? undefined : 'ghost'}
          as={Link}
          href="/settings"
          size="sm"
          className={styles['sidebar-button']}
        >
          <Settings className={styles.icon} />
          <span className={styles.label}>Настройки</span>
        </Button>

        <Button
          variant={'ghost'}
          size="sm"
          onClick={() => {
            console.log('logout');
          }}
          className={styles['sidebar-button']}
        >
          <LogOut className={styles.icon} />
          <span className={styles.label}>Выйти</span>
        </Button>
      </nav>
    </div>
  );
}
