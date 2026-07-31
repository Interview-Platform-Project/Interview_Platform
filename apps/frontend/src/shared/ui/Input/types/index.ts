import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputState?: InputStates;
  children?: React.ReactNode;
}

export enum InputStates {
  DEFAULT = 'default',
  ACTIVE = 'active',
  DISABLED = 'disabled',
  ERROR = 'error',
  SUCCESS = 'success',
}
