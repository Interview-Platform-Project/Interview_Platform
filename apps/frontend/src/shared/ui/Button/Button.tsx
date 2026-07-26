import { Button as BaseButton, ButtonProps as BaseButtonProps } from '@base-ui/react/button';
import styles from './Button.module.scss';
import clsx from 'clsx';

export interface ButtonProps extends BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  iconOnly?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'start',
  iconOnly = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  const combinedClassName = clsx(
    styles.button,
    styles[`button--variant-${variant}`],
    styles[`button--size-${size}`],
    {
      [styles['button--icon-only']]: iconOnly,
    },
    className,
  );

  return (
    <BaseButton className={combinedClassName} {...props}>
      {icon && iconPosition === 'start' ? (
        <span className={styles.button__icon}>{icon}</span>
      ) : null}
      {!iconOnly ? <span className={styles.button__content}>{children}</span> : null}
      {icon && iconPosition === 'end' ? <span className={styles.button__icon}>{icon}</span> : null}
    </BaseButton>
  );
};
