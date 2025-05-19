import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Greenhouse Management System</h1>
      <Link href="/login" className="text-blue-600 underline">
        Login
      </Link>
    </main>
  );
}
