'use client';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
export default function NotAuthorizedPage() {
    const { userId } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!userId) {
            router.push('/sign-in');
        }
    }, [userId, router]);
    return (<div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-6">
          You don&apos;t have permission to access this page.
        </p>
        <button onClick={() => router.push('/')} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Return to Home
        </button>
      </div>
    </div>);
}
