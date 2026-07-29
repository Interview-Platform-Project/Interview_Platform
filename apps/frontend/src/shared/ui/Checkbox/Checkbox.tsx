import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import styles from './Checkbox.module.scss';

type CheckboxProps = React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root> & {
  children?: React.ReactNode;
};

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}

export function Checkbox(props: CheckboxProps) {
  const { children, className, ...rest } = props;

  return (
    <label className={styles.checkbox}>
      <BaseCheckbox.Root className={cn(styles.checkbox__root, className)} {...rest}>
        <BaseCheckbox.Indicator className={styles.checkbox__indicator}>
          <CheckIcon />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>

      <span className={styles.checkbox__label}>{children}</span>
    </label>
  );
}

export default Checkbox;
