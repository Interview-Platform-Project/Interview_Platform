import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';
import styles from './Input.module.scss';
import { InputStates } from './types';

const meta = {
  component: Input,
  args: {
    placeholder: 'Введите текст',
    type: 'text',
    disabled: false,
  },
  argTypes: {
    disabled: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number'] },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Введите текст...',
    inputState: InputStates.DEFAULT,
    // передать тему
  },
};

export const Error: Story = {
  args: {
    inputState: InputStates.ERROR,
    // передать тему
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    inputState: InputStates.DISABLED,
    // передать тему
  },
};

export const Focused: Story = {
  args: {
    inputState: InputStates.FOCUSED,
    // передать тему
  },
};

export const Success: Story = {
  args: {
    inputState: InputStates.SUCCESS,
    // передать тему
  },
};
