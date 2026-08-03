import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Checkbox from './Checkbox';

const meta = {
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Чекбокс активен',
    defaultChecked: true,
  },
};

export const Unchecked: Story = {
  args: {
    children: 'Чекбокс',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Недоступный чекбокс',
    disabled: true,
    defaultChecked: true,
  },
};
