import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import styles from './Checkbox.module.scss';

type CheckboxProps = React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root> & {
  children?: React.ReactNode;
  variant?: 'checkbox' | 'radio';
};

function CheckIcon(props: React.ComponentProps<'svg'>) {
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
      {...props}
    >
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}

export function Checkbox(props: CheckboxProps) {
  const { children, className, variant = 'checkbox', ...rest } = props;

  const rootClass = cn(variant === 'radio' ? styles.radioRoot : styles.checkboxRoot, className);

  const indicatorClass = variant === 'radio' ? styles.radioIndicator : styles.checkboxIndicator;

  const labelClass = cn(styles.label, variant === 'radio' && styles.labelRadio);

  return (
    <label className={labelClass}>
      <BaseCheckbox.Root className={rootClass} {...rest}>
        <BaseCheckbox.Indicator className={indicatorClass}>
          {variant === 'checkbox' ? <CheckIcon /> : <span className={styles.radioDot} />}
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      <span className={styles.labelText}>{children}</span>
    </label>
  );
}

export default Checkbox;
