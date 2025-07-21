'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.email}</h1>
      <button onClick={() => signOut({ callbackUrl: '/login' })}>Logout</button>
    </div>
  );
}
