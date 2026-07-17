export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'big';
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary';
  className?: string;
  children: React.ReactNode;
}
