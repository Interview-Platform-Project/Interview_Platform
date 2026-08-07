import { Button as BaseButton, ButtonProps as BaseButtonProps } from '@base-ui/react/button';
import clsx from 'clsx';
import styles from './Button.module.scss';

export interface ButtonProps extends BaseButtonProps {
  variant?: 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const { variant, size = 'md', className, children, ...rest } = props;

  const combinedClassName = clsx(
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    className,
  );

  return (
    <BaseButton className={combinedClassName} {...rest}>
      {children}
    </BaseButton>
  );
};
