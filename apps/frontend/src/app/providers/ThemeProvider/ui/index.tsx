import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { Themes } from '@/shared/types/Themes';

export const ThemeProvider = ({ children }: { children: React.ReactNode; }) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme={Themes.DARK} enableSystem>
      {children}
    </NextThemeProvider>
  );
};
