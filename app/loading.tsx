export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 w-96 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto mb-8 animate-pulse" />
          <div className="max-w-2xl mx-auto mb-10">
            <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="h-10 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto mb-2 animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto animate-pulse" />
            </div>
            <div className="text-center">
              <div className="h-10 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto mb-2 animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto animate-pulse" />
            </div>
            <div className="text-center">
              <div className="h-10 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto mb-2 animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto animate-pulse" />
            </div>
          </div>
        </div>

        {/* Genres Skeleton */}
        <div className="mb-12">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4 animate-pulse" />
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Grid Skeleton */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
