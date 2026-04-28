export default function NovelLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb skeleton */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-2 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
          </div>
        </nav>

        {/* Novel Header skeleton */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column skeleton */}
            <div className="lg:w-2/3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse mb-4" />
                </div>
                <div className="flex flex-col items-start sm:items-end gap-3">
                  <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
                  <div className="flex gap-3">
                    <div className="h-7 w-24 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-7 w-20 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Genres skeleton */}
              <div className="mb-6">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="flex flex-wrap gap-2">
                  <div className="h-8 w-20 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="h-8 w-16 bg-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>

              {/* Tags skeleton */}
              <div className="mb-8">
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-6 w-14 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Summary skeleton */}
              <div className="mb-8">
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Right Column skeleton */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i}>
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-1" />
                      <div className="h-5 w-24 bg-gray-300 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Section skeleton */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Similar Novels skeleton */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="h-7 w-14 bg-gray-200 rounded-full animate-pulse" />
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation skeleton */}
        <div className="flex justify-between">
          <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-44 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}