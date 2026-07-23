import { Field } from '@base-ui/react/field';
import { cn } from '@/shared/lib/utils';
import styles from './Input.module.scss';
import type { InputProps } from './types';
import { InputStates } from './types';

type InputWithErrorProps = InputProps & {
  errorText?: string;
  validate?: (value: unknown) => string | null;
  validationMode?: 'onBlur' | 'onChange' | 'onSubmit';
  icon?: React.ReactNode;
};

export function Input(props: InputWithErrorProps) {
  const {
    inputState,
    className,
    children,
    id,
    errorText,
    validate,
    validationMode = 'onBlur',
    icon,
    ...rest
  } = props;

  const stateClass = inputState ? styles['input--' + inputState] : '';
  const invalid = inputState === InputStates.ERROR || Boolean(errorText);

  return (
    <Field.Root
      className={styles.field}
      invalid={invalid}
      validate={validate}
      validationMode={validationMode}
    >
      {children ? (
        <Field.Label className={cn(styles.label, invalid && styles['label--error'])}>
          {children}
        </Field.Label>
      ) : null}

      {icon ? <span className={styles.iconInside}>{icon}</span> : null}

      <Field.Control id={id} className={cn(styles.input, className, stateClass)} {...rest} />

      {errorText ? <Field.Error className={styles.error}>{errorText}</Field.Error> : null}
    </Field.Root>
  );
}
