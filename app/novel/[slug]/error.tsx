'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function NovelError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Novel detail error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
      <div className="text-center px-4 max-w-lg">
        <div className="text-6xl mb-6">&#128214;</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Unable to load this novel review
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Something went wrong while loading this novel. It may have been removed or is temporarily
          unavailable.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Browse novels
          </Link>
        </div>
      </div>
    </div>
  );
}
