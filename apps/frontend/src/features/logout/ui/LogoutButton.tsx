'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { logoutRequest, SESSION_QUERY_KEY } from '@/entities/session';
import { Button } from '@/shared/ui/Button';

export function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      queryClient.setQueryData(SESSION_QUERY_KEY, null);
      await queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
      router.replace('/login');
      router.refresh();
    }
  };

  return (
    <Button type="button" onClick={logout}>
      Logout
    </Button>
  );
}
