import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import NovelGrid from '@/components/NovelGrid';
import StarIcon from '@/components/StarIcon';
import { getReadingListById, getReadingLists } from '@/lib/novels';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const list = getReadingListById(id);

  if (!list) {
    return {
      title: 'Reading List Not Found',
      description: 'The requested reading list could not be found.',
    };
  }

  return {
    title: `${list.name} - Curated Reading List`,
    description: list.description,
  };
}

export async function generateStaticParams() {
  return getReadingLists().map((list) => ({ id: list.id }));
}

export default async function ReadingListPage({ params }: PageProps) {
  const { id } = await params;
  const list = getReadingListById(id);

  if (!list) {
    notFound();
  }

  const avgRating =
    list.count > 0
      ? (list.novels.reduce((acc, n) => acc + n.rating, 0) / list.count).toFixed(1)
      : '0.0';
  const completedCount = list.novels.filter((n) => n.status === 'completed').length;
  const ongoingCount = list.novels.filter((n) => n.status === 'ongoing').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Reading Lists', href: '/lists' },
            { label: list.name },
          ]}
        />

        {/* List Header */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {list.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl">{list.description}</p>
            </div>
            {avgRating !== '0.0' && (
              <div className="flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full whitespace-nowrap">
                <StarIcon className="w-5 h-5 mr-2" />
                <span className="text-xl font-bold">{avgRating}</span>
                <span className="ml-1">avg rating</span>
              </div>
            )}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {list.count}
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
          </div>
        </div>

        {/* Novels in this list */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {list.count} Novel{list.count !== 1 ? 's' : ''} in this List
          </h2>
          {list.count > 0 ? (
            <NovelGrid novels={list.novels} />
          ) : (
            <p className="text-gray-500 dark:text-gray-400">This list is currently empty.</p>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex justify-between">
          <Link
            href="/lists"
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline"
          >
            &larr; Back to all lists
          </Link>
        </div>
      </div>
    </div>
  );
}
