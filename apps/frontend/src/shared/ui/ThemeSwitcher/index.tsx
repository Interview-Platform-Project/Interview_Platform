'use client';

import clsx from 'clsx';
import { SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ComponentProps } from 'react';
import { Button } from '../Button';
import styles from './ThemeSwitcher.module.scss';

export function ThemeSwitcher(props: ComponentProps<typeof Button>) {
  const { className, ...otherProps } = props;
  //   const { setTheme } = useTheme();
  //   const toggleTheme = () => setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  return (
    <Button
      //   onClick={toggleTheme}
      variant="ghost"
      className={clsx(styles.button, className)}
      {...otherProps}
    >
      <SunMoon color="var(--foreground)" />
    </Button>
  );
}
