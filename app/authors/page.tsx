import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { getAuthorsWithCounts } from '@/lib/novels';

export const metadata: Metadata = {
  title: 'All Authors - Chinese Web Novel Reviews',
  description:
    'Browse all authors of Chinese and Korean web novels reviewed on the site. Find every novel by your favorite author with English reviews and ratings.',
};

export default function AuthorsPage() {
  const authors = getAuthorsWithCounts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Authors' }]} />

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Authors
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            {authors.length} authors reviewed on the site. Pick an author to see every novel of
            theirs we have covered.
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {authors.map((author) => (
            <Link
              key={author.name}
              href={`/author/${encodeURIComponent(author.name)}`}
              className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-100 dark:border-gray-800 p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all"
            >
              <span className="font-medium text-gray-900 dark:text-gray-100 truncate mr-2">
                {author.name}
              </span>
              <span className="flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                {author.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
