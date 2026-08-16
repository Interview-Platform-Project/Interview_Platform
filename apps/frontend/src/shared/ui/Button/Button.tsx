import { Button as BaseButton } from '@base-ui/react/button';

import clsx from 'clsx';

import React, { ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.scss';

type PolymorphicButtonProps<T extends React.ElementType = typeof BaseButton> = {
  as?: T;
  variant?: 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends React.ElementType = typeof BaseButton>({
  ...props
}: PolymorphicButtonProps<T>) => {
  const { variant, size = 'md', className, children, as, ...rest } = props;
  const Component = as || BaseButton;

  const combinedClassName = clsx(
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    className,
  );

  return (
    <Component className={combinedClassName} {...rest}>
      {children}
    </Component>
  );
};
