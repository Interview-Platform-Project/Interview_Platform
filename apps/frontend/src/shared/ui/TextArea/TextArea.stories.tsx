import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextArea } from './TextArea';
import { TextAreaStates } from './types';

const meta = {
  component: TextArea,
  args: {
    placeholder: 'Введите текст',
    disabled: false,
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Введите текст...',
    inputState: TextAreaStates.DEFAULT,
  },
};

export const Error: Story = {
  args: {
    inputState: TextAreaStates.ERROR,
    errorText: 'Поле обязательно',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    inputState: TextAreaStates.DISABLED,
  },
};

export const Focused: Story = {
  args: {
    inputState: TextAreaStates.FOCUSED,
  },
};

export const Success: Story = {
  args: {
    inputState: TextAreaStates.SUCCESS,
  },
};
