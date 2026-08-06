import clsx from 'clsx';
import { SunMoon } from 'lucide-react';
import { ComponentProps } from 'react';
import { Button } from '../Button';
import styles from './ThemeSwitcher.module.scss';

export function ThemeSwitcher(props: ComponentProps<typeof Button>) {
  const { className, ...otherProps } = props;
  return (
    <Button variant="ghost" className={clsx(styles.button, className)} {...otherProps}>
      <SunMoon color="var(--foreground)" />
    </Button>
  );
}
