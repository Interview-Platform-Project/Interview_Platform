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
      className={cn(styles.input, stateClass)}
      invalid={invalid}
      validate={validate}
      validationMode={validationMode}
    >
      {children ? (
        <Field.Label className={cn(styles.input__label, invalid && styles['input__label--error'])}>
          {children}
        </Field.Label>
      ) : null}

      {icon ? <span className={styles.input__icon}>{icon}</span> : null}

      <Field.Control
        id={id}
        className={cn(styles.input__field, className, icon && styles.input__control)}
        {...rest}
      />

      {errorText ? <Field.Error className={styles.input__error}>{errorText}</Field.Error> : null}
    </Field.Root>
  );
}
