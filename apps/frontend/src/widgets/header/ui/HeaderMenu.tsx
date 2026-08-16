'use client';

import { Bell, Settings } from 'lucide-react';
import { Button } from '@/shared/ui';
import styles from './HeaderMenu.module.scss';

export default function HeaderMenu() {
  return (
    <div className={styles.root}>
      <Button className={styles['header__menu-new-session-button']} size={'sm'}>
        + Новая сессия
      </Button>
      <div className={styles.icons}>
        <Button
          className={styles.iconButton}
          variant={'ghost'}
          size={'sm'}
          aria-label="notifications"
        >
          <Bell size={16} />
        </Button>
        <Button className={styles.iconButton} variant={'ghost'} size={'sm'} aria-label="settings">
          <Settings size={16} />
        </Button>
      </div>
    </div>
  );
}
