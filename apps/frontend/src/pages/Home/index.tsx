'use client';

import { useSession } from '@/entities/session';
import { LogoutButton } from '@/features/logout';

export default function HomePage() {
  const { data } = useSession();

  return (
    <main>
      <h1>Home</h1>
      {data?.user ? <p>{data.user.email}</p> : null}
      <LogoutButton />
    </main>
  );
}
