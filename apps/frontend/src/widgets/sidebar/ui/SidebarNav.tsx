'use client';

import Image from 'next/image';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { Button } from '@/shared/ui';

import { sidebarNavMock } from '../api';
import SidebarFooter from './SidebarFooter';
import styles from './SidebarNav.module.scss';

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className={styles['sidebar-nav']}>
      <div>
        <div className={styles['sidebar-header']}>
          <Image width={176} height={24} src="/logo.svg" alt="INTERVIEW//PLATFORM" />
        </div>
        <div className={styles['sidebar-body']}>
          {sidebarNavMock.map((item) => {
            return (
              <Button
                key={item.title}
                as={Link}
                href={item.linkTo}
                variant={pathname === item.linkTo ? undefined : 'ghost'}
                className={styles['sidebar-button']}
                size="sm"
              >
                {item.icon && <item.icon />} {item.title}
              </Button>
            );
          })}
        </div>
      </div>
      <SidebarFooter />
    </nav>
  );
}
