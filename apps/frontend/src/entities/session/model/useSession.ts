'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchSession } from '../api/session-api';
import { SESSION_QUERY_KEY } from './query-key';

export function useSession() {
  return useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: fetchSession,
    retry: false,
    staleTime: 60_000,
  });
}
