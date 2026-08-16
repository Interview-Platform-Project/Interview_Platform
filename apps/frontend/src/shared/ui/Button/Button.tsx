import { Button as BaseButton, type ButtonProps as BaseButtonProps } from '@base-ui/react/button';
import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';
import styles from './Button.module.scss';

export interface ButtonProps extends BaseButtonProps {
  variant?: 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { variant, size = 'md', className, children, isLoading = false, disabled, ...rest } = props;

  const combinedClassName = clsx(
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    isLoading && styles['button--loading'],
    className,
  );

  return (
    <BaseButton className={combinedClassName} disabled={disabled || isLoading} {...rest}>
      {isLoading && <LoaderCircle aria-hidden className={styles.button__spinner} />}
      {children}
    </BaseButton>
  );
};
