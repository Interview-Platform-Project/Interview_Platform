import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Search, Settings, Trash2 } from 'lucide-react';
import { Button } from './Button';

const meta = {
  title: 'shared/ui/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: false,
    children: 'Нажми меня',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/////////////////////////////////////////////////////////////////////

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithStartIcon: Story = {
  args: {
    children: [
      <span key="label">Настройки</span>,
      <Settings key="icon" size={20} aria-hidden="true" />,
    ],
  },
};

export const IconOnly: Story = {
  args: {
    children: <Search size={20} aria-hidden="true" />,
    // icon: <Search size={20} aria-hidden="true" />,
    // iconOnly: true,
    'aria-label': 'Поиск',
  },
};

export const Showcase: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 980 }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
        <Button>Основная</Button>
        <Button variant="secondary">Вторичная</Button>
        <Button variant="outline">С обводкой</Button>
        <Button variant="ghost">Без фона</Button>
        <Button variant="danger">Удалить</Button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
        <Button>
          <Settings size={20} aria-hidden="true" />
          Настройки
        </Button>
        <Button disabled>Отключена</Button>
        <Button size="sm">Маленькая</Button>
        <Button size="lg">Большая</Button>

        <Button>
          <Trash2 size={20} aria-hidden="true" />
        </Button>
      </div>
    </div>
  ),
};
