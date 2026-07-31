import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Radio from './Radio';

const meta = {
  component: Radio,
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Radio кнопка',
    defaultChecked: true,
  },
};

export const Unchecked: Story = {
  args: {
    children: 'Radio кнопка',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Недоступная radio',
    defaultChecked: true,
    disabled: true,
  },
};
