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
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
          <p className="text-gray-600">
            Logged in as: <span className="font-medium text-blue-600">{session.user?.email}</span>
          </p>
        </div>
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Sign Out
        </button>
      </div>
    </main>
  );
}
