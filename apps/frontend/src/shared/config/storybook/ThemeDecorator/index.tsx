import { withThemeByClassName } from '@storybook/addon-themes';
import { Themes } from '@/shared/types/Themes';

export const ThemeDecorator =
  withThemeByClassName({
    themes: {
      light: Themes.LIGHT,
      dark: Themes.DARK,
    },
    defaultTheme: Themes.DARK,
    // parentSelector: 'html',
  })

