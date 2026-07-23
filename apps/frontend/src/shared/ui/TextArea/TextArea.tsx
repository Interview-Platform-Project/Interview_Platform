import { Field } from '@base-ui/react/field';
import { cn } from '@/shared/lib/utils';
import styles from './TextArea.module.scss';
import type { TextAreaProps } from './types';
import { TextAreaStates } from './types';

type TextAreaWithErrorProps = TextAreaProps & {
  errorText?: string;
  validate?: (value: unknown) => string | null;
  validationMode?: 'onBlur' | 'onChange' | 'onSubmit';
};

export function TextArea(props: TextAreaWithErrorProps) {
  const {
    inputState,
    className,
    children,
    id,
    errorText,
    validate,
    validationMode = 'onBlur',
    ...rest
  } = props;

  const stateClass = inputState ? styles[`textarea--${inputState}`] : '';

  const invalid = inputState === TextAreaStates.ERROR || Boolean(errorText);

  return (
    <Field.Root
      className={styles.field}
      invalid={invalid}
      validate={validate}
      validationMode={validationMode}
    >
      {children && (
        <Field.Label className={cn(styles.label, invalid && styles['label--error'])}>
          {children}
        </Field.Label>
      )}

      <Field.Control
        render={
          <textarea id={id} className={cn(styles.textarea, className, stateClass)} {...rest} />
        }
      />

      {errorText && <Field.Error className={styles.error}>{errorText}</Field.Error>}
    </Field.Root>
  );
}

export default TextArea;
