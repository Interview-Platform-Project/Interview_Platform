'use client';
import { QueryProvider } from './QueryProvider';
import { SessionBootstrap } from './SessionBootstrap';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <SessionBootstrap />
      {children}
    </QueryProvider>
  );
};
