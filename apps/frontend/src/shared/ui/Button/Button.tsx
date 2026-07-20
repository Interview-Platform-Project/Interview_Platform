import { Button as ButtonPrimitive, ButtonProps } from '@base-ui/react/button';
import { cn } from '@/shared/lib/utils';
import styles from './Button.module.scss';

function Button(props: ButtonProps) {
  const { className, ...rest } = props;

  return <ButtonPrimitive className={cn(styles.button, className)} data-slot="button" {...rest} />;
}

export { Button };
