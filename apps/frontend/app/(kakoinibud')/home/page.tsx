'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/shared/api';
import { Button } from '@/shared/ui/Button';

export default function Home() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      await apiRequest({
        url: '/auth/logout',
        method: 'POST',
        skipRefresh: true,
      });
    } finally {
      queryClient.setQueryData(['me'], null);
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      router.replace('/login');
      router.refresh();
    }
  };

  return (
    <>
      <h1>Home</h1>
      <Button type="button" onClick={logout}>
        Logout
      </Button>
    </>
  );
}
