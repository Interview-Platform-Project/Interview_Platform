'use client';
import { SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import styles from './ThemeSwitcher.module.scss';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={styles['theme-switcher']} onClick={toggleTheme}>
      <SunMoon />
    </div>
  );
}
