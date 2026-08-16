'use client';

import { useQuery } from '@tanstack/react-query';
import { ApiError, apiRequest } from '@/shared/api';

type MeResponse = {
  user: {
    id: string;
    email: string;
  };
};

export const SessionBootstrap = () => {
  useQuery({
    queryKey: ['me'],
    queryFn: async (): Promise<MeResponse | null> => {
      try {
        return await apiRequest<MeResponse>({
          url: '/auth/me',
          method: 'GET',
          skipRefresh: true,
        });
      } catch (error) {
        // Guest: 401 is a normal state, not a failed bootstrap.
        if (error instanceof ApiError && error.status === 401) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 60_000,
  });

  return null;
};
