'use client';

import { useSession } from '@/entities/session';

/** App-layer bootstrap: loads current session on mount. */
export function SessionBootstrap() {
  useSession();
  return null;
}
