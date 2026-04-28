import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import NovelGrid from '@/components/NovelGrid';
import StarIcon from '@/components/StarIcon';
import { getNovelsByAuthor, getAllNovels } from '@/lib/novels';

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const novels = getNovelsByAuthor(name);

  if (novels.length === 0) {
    return {
      title: 'Author Not Found',
      description: 'The requested author could not be found.',
    };
  }

  const authorName = novels[0].author;

  return {
    title: authorName + ' - Novels & Reviews | Chinese Novel Reviews',
    description: `Browse ${novels.length} Chinese web novels by ${authorName}. Read English reviews and ratings.`,
  };
}

export async function generateStaticParams() {
  const allNovels = getAllNovels();
  const authorSet = new Set<string>();
  allNovels.forEach((n) => authorSet.add(n.author));
  return Array.from(authorSet).map((name) => ({ name }));
}

export default async function AuthorPage({ params }: PageProps) {
  const { name } = await params;
  const novels = getNovelsByAuthor(name);

  if (novels.length === 0) {
    notFound();
  }

  const authorName = novels[0].author;
  const totalNovels = novels.length;
  const avgRating = (novels.reduce((acc, n) => acc + n.rating, 0) / totalNovels).toFixed(1);
  const completedCount = novels.filter((n) => n.status === 'completed').length;
  const ongoingCount = novels.filter((n) => n.status === 'ongoing').length;
  const totalChapters = novels.reduce((acc, n) => acc + n.chapters, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: authorName }]} />

        {/* Author Header */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {authorName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Browse {totalNovels} Chinese web novel{totalNovels !== 1 ? 's' : ''} by {authorName}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full">
                <StarIcon className="w-5 h-5 mr-2" />
                <span className="text-xl font-bold">{avgRating}</span>
                <span className="ml-1">avg rating</span>
              </div>
              <div className="flex items-center bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-full">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span className="text-xl font-bold">{totalChapters.toLocaleString()}</span>
                <span className="ml-1">total ch.</span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {totalNovels}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Novels</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {completedCount}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {ongoingCount}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Ongoing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {avgRating}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Novels by this Author */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Novels by {authorName}
          </h2>
          <NovelGrid novels={novels} />
        </div>

        {/* Navigation Links */}
        <div className="flex justify-between">
          <Link
            href="/"
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline"
          >
            &larr; Back to all novels
          </Link>
        </div>
      </div>
    </div>
  );
}
