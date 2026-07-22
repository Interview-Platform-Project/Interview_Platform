import { cn } from '@/shared/lib/utils';
import styles from './TextArea.module.scss';
import type { TextAreaProps } from './types';

export function TextArea(props: TextAreaProps) {
  const { inputState, className, children, id, ...rest } = props;
  const stateClass = inputState ? styles['textarea--' + inputState] : '';

  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {children}
        <textarea id={id} className={cn(styles.textarea, className, stateClass)} {...rest} />
      </label>
    </div>
  );
}

export default TextArea;
