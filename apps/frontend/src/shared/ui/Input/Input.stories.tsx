import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Mail } from 'lucide-react';
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
    children: 'Стандартное поле (Input)',
    type: 'text',
    placeholder: 'Введите текст...',
    inputState: InputStates.DEFAULT,
  },
};

export const EmailError: Story = {
  args: {
    children: 'Email адрес',
    type: 'email',
    placeholder: 'Email адрес',
    inputState: InputStates.ERROR,
    errorText: 'Пожалуйста, введите корректный email.',
  },
};

export const EmailValidation: Story = {
  render: (args) => (
    <Input
      {...args}
      validationMode="onBlur"
      validate={(value) => {
        const email = String(value || '');
        if (!email) return 'Email обязателен';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
          return 'Пожалуйста, введите корректный email.';
        return null;
      }}
    />
  ),
  args: {
    children: 'Email адрес',
    type: 'email',
    placeholder: 'Email адрес',
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <Input {...args} className={styles.inputWithIcon} icon={<Mail size={16} />} />
    </div>
  ),
  args: {
    children: 'Email адрес',
    type: 'email',
    placeholder: 'Email адрес',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    inputState: InputStates.DISABLED,
    // передать тему
  },
};

export const Success: Story = {
  args: {
    inputState: InputStates.SUCCESS,
    // передать тему
  },
};
