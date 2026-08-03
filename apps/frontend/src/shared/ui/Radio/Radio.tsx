import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import styles from './Radio.module.scss';

type RadioProps = React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root> & {
  children?: React.ReactNode;
};

export function Radio(props: RadioProps) {
  const { children, className, ...rest } = props;

  return (
    <label className={styles.radio}>
      <BaseCheckbox.Root className={cn(styles.radio__root, className)} {...rest}>
        <BaseCheckbox.Indicator className={styles.radio__indicator}>
          <span className={styles.radio__dot} />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>

      <span className={styles.radio__label}>{children}</span>
    </label>
  );
}

export default Radio;
