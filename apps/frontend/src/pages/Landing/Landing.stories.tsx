// ,

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Landing from '.';

const meta = {
  title: 'pages/Landing',
  component: Landing,
  parameters: {
    chromatic: { disableSnapshot: false }, // для визуальных тестов
  },
} satisfies Meta<typeof Landing>;

export default meta;
type Story = StoryObj<typeof meta>;

/////////////////////////////////////////////////////////////////////

export const Primary: Story = {};
