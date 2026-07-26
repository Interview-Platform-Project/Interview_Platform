import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Search, Settings, Trash2 } from 'lucide-react';
import { Button } from './Button';

const iconOptions = {
  none: undefined,
  settings: <Settings size={20} aria-hidden="true" />,
  trash: <Trash2 size={20} aria-hidden="true" />,
  search: <Search size={20} aria-hidden="true" />,
} as const;

const meta = {
  title: 'shared/ui/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    children: 'Нажми меня',
    icon: undefined,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    icon: {
      control: { type: 'select' },
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      labels: {
        none: 'Без иконки',
        settings: 'Settings',
        trash: 'Trash2',
        search: 'Search',
      },
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
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
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithStartIcon: Story = {
  args: {
    children: 'Настройки',
    icon: <Settings size={20} aria-hidden="true" />,
    iconPosition: 'start',
  },
};

export const IconOnly: Story = {
  args: {
    icon: <Search size={20} aria-hidden="true" />,
    iconOnly: true,
    'aria-label': 'Поиск',
  },
};

export const Showcase: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 980 }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
        <Button variant="primary">Основная</Button>
        <Button variant="secondary">Вторичная</Button>
        <Button variant="outline">С обводкой</Button>
        <Button variant="ghost">Без фона</Button>
        <Button variant="danger">Удалить</Button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
        <Button icon={<Settings size={20} aria-hidden="true" />}>Настройки</Button>
        <Button disabled>Отключена</Button>
        <Button size="small">Маленькая</Button>
        <Button size="large">Большая</Button>
        <Button icon={<Trash2 size={20} aria-hidden="true" />} iconOnly aria-label="Поиск" />
      </div>
    </div>
  ),
};
