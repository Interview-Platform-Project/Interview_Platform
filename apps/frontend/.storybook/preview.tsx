import '@/app/styles/globals.scss';
import type { Preview } from '@storybook/nextjs-vite';
import { FontDecorator } from '@/shared/config/storybook/FontDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const preview: Preview = {
  parameters: {
    chromatic: { disableSnapshot: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [ThemeDecorator, FontDecorator],
};

export default preview;
