import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      {session ? (
        <p>Welcome, {session.user?.name}</p>
      ) : (
        <p>You are not logged in. <Link href="/login" className="underline">Login</Link></p>
      )}
    </main>
  );
}
