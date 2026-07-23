import type { TextareaHTMLAttributes } from 'react';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputState?: TextAreaStates;
  children?: React.ReactNode;
}

export enum TextAreaStates {
  DEFAULT = 'default',
  ACTIVE = 'active',
  FOCUSED = 'focused',
  DISABLED = 'disabled',
  ERROR = 'error',
  SUCCESS = 'success',
}
