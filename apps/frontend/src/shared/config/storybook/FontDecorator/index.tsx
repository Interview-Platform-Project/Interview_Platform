import { fonts } from '@/app/config/fonts';

export const FontDecorator = (Story: any) => {
  document.documentElement.classList.add(fonts.manropeSans.variable);
  return <Story />;
};
