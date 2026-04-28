'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-gray-50 dark:bg-gray-950">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center px-4 max-w-lg">
            <div className="text-6xl mb-6">&#9888;&#65039;</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Critical Error
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The application encountered a critical error and cannot recover. Please refresh the
              page to try again.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Refresh
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
