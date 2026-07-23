import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Checkbox from './Checkbox';
import styles from './Checkbox.module.scss';

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

export const Radio: Story = {
  render: (args) => (
    <Checkbox {...args} variant="radio">
      Radio кнопка
    </Checkbox>
  ),
  args: {
    defaultChecked: true,
  },
};
