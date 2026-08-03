import { Manrope } from 'next/font/google';
import type { ComponentType } from 'react';

const manropeSans = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

export const FontDecorator = (Story: ComponentType) => {
  document.documentElement.classList.add(manropeSans.variable);

  return <Story />;
};
