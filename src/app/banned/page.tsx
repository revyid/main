'use client';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
export default function BannedPage() {
    const { userId } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!userId) {
            router.push('/sign-in');
        }
    }, [userId, router]);
    return (<div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Account Banned</h1>
        <p className="mb-4">
          Your account has been restricted from accessing this platform.
        </p>
        <p className="mb-6">
          If you believe this is an error, please contact support.
        </p>
        <button onClick={() => router.push('/sign-in')} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
          Return to Sign In
        </button>
      </div>
    </div>);
}
