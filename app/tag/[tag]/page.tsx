import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import NovelGrid from '@/components/NovelGrid';
import StarIcon from '@/components/StarIcon';
import { getNovelsByTag, getAllTags } from '@/lib/novels';

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const novels = getNovelsByTag(tag);

  if (novels.length === 0) {
    return {
      title: 'Tag Not Found',
      description: 'The requested tag could not be found.',
    };
  }

  const tagName = tag.charAt(0).toUpperCase() + tag.slice(1);

  return {
    title: tagName + ' Chinese Novels - Reviews & Ratings',
    description: `Browse ${novels.length} Chinese web novels tagged with ${tagName}. Read English reviews and ratings.`,
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const novels = getNovelsByTag(tag);

  if (novels.length === 0) {
    notFound();
  }

  const allTags = getAllTags();
  const totalNovels = novels.length;
  const avgRating = (novels.reduce((acc, n) => acc + n.rating, 0) / totalNovels).toFixed(1);
  const completedCount = novels.filter((n) => n.status === 'completed').length;
  const ongoingCount = novels.filter((n) => n.status === 'ongoing').length;
  const uniqueAuthors = new Set(novels.map((n) => n.author)).size;

  // Derive tag name from the novels that matched (use exact tag casing from data)
  const matchedNovel = novels.find((n) =>
    n.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
  const tagName = matchedNovel
    ? matchedNovel.tags.find((t) => t.toLowerCase() === tag.toLowerCase()) || tag
    : tag;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: tagName }]} />

        {/* Tag Header */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {tagName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Browse {totalNovels} Chinese web novel{totalNovels !== 1 ? 's' : ''} tagged with{' '}
                {tagName}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full">
                <StarIcon className="w-5 h-5 mr-2" />
                <span className="text-xl font-bold">{avgRating}</span>
                <span className="ml-1">avg rating</span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {totalNovels}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Novels</div>
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
                {uniqueAuthors}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Authors</div>
            </div>
          </div>
        </div>

        {/* Tag Navigation */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Browse Other Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((t) => (
              <Link
                key={t}
                href={`/tag/${t.toLowerCase()}`}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  t.toLowerCase() === tag.toLowerCase()
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>

        {/* Novels with this Tag */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {totalNovels} Novel{totalNovels !== 1 ? 's' : ''} Tagged with {tagName}
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
