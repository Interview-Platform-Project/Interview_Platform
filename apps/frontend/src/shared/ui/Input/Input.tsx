import { cn } from '@/shared/lib/utils';
import styles from './Input.module.scss';
import type { InputProps } from './types';
import { InputStates } from './types';

export function Input(props: InputProps) {
  const { inputState, className, children } = props;
  const stateClass = inputState ? styles['input--' + inputState] : '';
  return (
    <div>
      <label htmlFor={props.id} className={styles.label}>
        {children}
        <input id={props.id} className={cn(styles.input, className, stateClass)} {...props} />
      </label>
    </div>
  );
}

export default Input;
