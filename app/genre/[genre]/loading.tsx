export default function GenreLoading() {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb skeleton */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-2 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-28 bg-gray-300 rounded animate-pulse" />
          </div>
        </nav>

        {/* Genre Header skeleton */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="h-10 w-1/2 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-10 w-28 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Genre Navigation skeleton */}
        <div className="mb-8">
          <div className="h-6 w-44 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="flex flex-wrap gap-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-9 w-20 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Novels Grid skeleton */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-36 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-44 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skeletonCards.map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="h-7 w-14 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-6 w-14 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <div className="h-5 w-14 bg-gray-200 rounded animate-pulse" />
                    <div className="h-5 w-18 bg-gray-200 rounded animate-pulse" />
                    <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Genre Description skeleton */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Navigation skeleton */}
        <div className="flex justify-between">
          <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-36 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}