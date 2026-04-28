import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NovelGrid from '@/components/NovelGrid';
import StarIcon from '@/components/StarIcon';
import { getNovelBySlug, getSimilarNovels, getAllNovelSlugs } from '@/lib/novels';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const novel = getNovelBySlug(slug);
  const similarNovels = getSimilarNovels(slug);

  if (!novel || similarNovels.length === 0) {
    return {
      title: 'Similar Novels Not Found',
      description: 'No similar novels found for the requested novel.',
    };
  }

  return {
    title: `Novels Similar to ${novel.title} - Recommendations`,
    description: `Find ${similarNovels.length} Chinese web novels similar to ${novel.title}. Read English reviews and ratings of similar cultivation, fantasy, and xianxia novels.`,
  };
}

export async function generateStaticParams() {
  const slugs = getAllNovelSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function SimilarToPage({ params }: PageProps) {
  const { slug } = await params;
  const novel = getNovelBySlug(slug);
  const similarNovels = getSimilarNovels(slug);

  if (!novel || similarNovels.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/novel/${novel.slug}`} className="hover:text-blue-600">
                {novel.title}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Similar Novels</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Novels Similar to <span className="text-blue-600">{novel.title}</span>
              </h1>
              <p className="text-gray-600">
                If you enjoyed {novel.title}, you might like these {similarNovels.length} similar
                Chinese web novels
              </p>
            </div>
            <Link
              href={`/novel/${novel.slug}`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← Back to {novel.title}
            </Link>
          </div>
        </div>

        {/* Original Novel Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">You enjoyed: {novel.title}</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <p className="text-gray-700 mb-4">{novel.summary.substring(0, 200)}...</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {novel.genre.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-gray-500">Rating</div>
                  <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    <StarIcon className="w-4 h-4 mr-1" />
                    <span className="font-bold">{novel.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-gray-500">Status</div>
                  <div
                    className={`px-2 py-1 text-xs rounded-full ${novel.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                  >
                    {novel.status === 'completed' ? 'Completed' : 'Ongoing'}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Chapters</div>
                  <div className="font-medium">{novel.chapters.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Novels Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {similarNovels.length} Similar Novel{similarNovels.length !== 1 ? 's' : ''}
            </h2>
            <div className="text-gray-600">Sorted by rating (highest first)</div>
          </div>
          <NovelGrid
            novels={similarNovels}
            description={`These novels share similar themes, genres, or storytelling styles with ${novel.title}`}
          />
        </div>

        {/* Why These Are Similar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why these novels are similar to {novel.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Shared Genres</h3>
              <div className="flex flex-wrap gap-2">
                {novel.genre.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 mt-3">
                These novels share one or more genres with {novel.title}, ensuring similar thematic
                elements and storytelling styles.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Common Themes</h3>
              <div className="flex flex-wrap gap-2">
                {novel.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 mt-3">
                Look for shared tags like cultivation systems, character archetypes, or plot
                structures that make these stories resonate with fans of {novel.title}.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-between">
          <Link href="/" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:underline">
            ← Back to all novels
          </Link>
          <div className="flex gap-3">
            <Link
              href={`/novel/${novel.slug}`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to {novel.title}
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse all novels
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
