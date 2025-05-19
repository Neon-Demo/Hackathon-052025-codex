'use client';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const handleDemo = () => {
    // Demo login can simply redirect to dashboard without auth
    window.location.href = '/dashboard';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl mb-4">Sign In</h2>
      <button className="mb-2 px-4 py-2 bg-blue-600 text-white" onClick={() => signIn('google')}>Sign in with Google</button>
      <button className="mb-2 px-4 py-2 bg-green-600 text-white" onClick={() => signIn('azure-ad')}>Sign in with Microsoft</button>
      <button className="px-4 py-2 bg-gray-600 text-white" onClick={handleDemo}>Demo Login</button>
    </div>
  );
}
