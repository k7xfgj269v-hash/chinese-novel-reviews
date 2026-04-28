import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import StarIcon from '@/components/StarIcon';
import { getReadingLists } from '@/lib/novels';

export const metadata: Metadata = {
  title: 'Curated Reading Lists - Chinese Web Novels',
  description:
    'Browse curated reading lists of Chinese and Korean web novels. Find your next read with hand-picked recommendations organized by theme, genre, and reading preferences.',
};

export default function ReadingListsPage() {
  const lists = getReadingLists();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Reading Lists' }]} />

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Curated Reading Lists
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Hand-picked collections of web novels organized by theme, mood, and reading style.
            Whether you are a newcomer or a seasoned reader, there is a list for you.
          </p>
        </div>

        {/* Lists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map((list) => {
            const avgRating =
              list.count > 0
                ? (list.novels.reduce((acc, n) => acc + n.rating, 0) / list.count).toFixed(1)
                : '0.0';

            return (
              <div
                key={list.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
              >
                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                      {list.count} novel{list.count !== 1 ? 's' : ''}
                    </span>
                    {avgRating !== '0.0' && (
                      <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <StarIcon className="w-4 h-4 mr-1 text-yellow-500" />
                        {avgRating} avg
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {list.name}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                    {list.description}
                  </p>

                  {/* Novel Previews */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {list.novels.slice(0, 5).map((novel) => (
                        <Link
                          key={novel.slug}
                          href={`/novel/${novel.slug}`}
                          className="inline-block px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors truncate max-w-[140px]"
                        >
                          {novel.title}
                        </Link>
                      ))}
                      {list.count > 5 && (
                        <span className="inline-block px-2.5 py-1 text-gray-500 dark:text-gray-500 text-xs">
                          +{list.count - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Browse Link */}
                  <Link
                    href={`/lists/${list.id}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors mt-auto"
                  >
                    Browse List
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-500">
          <p>
            Reading lists are curated based on community ratings, genre diversity, and reader
            recommendations. Novel availability may vary by region and platform.
          </p>
        </div>
      </div>
    </div>
  );
}
