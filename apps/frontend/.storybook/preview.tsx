import '@/app/styles/globals.scss';
import type { Preview } from '@storybook/nextjs-vite';
import { ThemeProvider } from '@/app/providers/ThemeProvider/ui';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const preview: Preview = {
  parameters: {
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
  decorators: [
    ThemeDecorator
  ],
};

export default preview;
