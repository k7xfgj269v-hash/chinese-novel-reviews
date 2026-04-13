import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NovelGrid from '@/components/NovelGrid';
import { getNovelBySlug, getSimilarNovels, getAllNovelSlugs, Novel } from '@/lib/novels';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const novel = getNovelBySlug(slug);
  
  if (!novel) {
    return {
      title: 'Novel Not Found',
      description: 'The requested novel could not be found.',
    };
  }
  
  return {
    title: `${novel.title} - Chinese Novel Review`,
    description: `${novel.summary.substring(0, 150)}... Read our detailed English review.`,
  };
}

export async function generateStaticParams() {
  const slugs = getAllNovelSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function NovelPage({ params }: PageProps) {
  const { slug } = await params;
  const novel = getNovelBySlug(slug);
  
  if (!novel) {
    notFound();
  }
  
  const similarNovels = getSimilarNovels(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{novel.title}</li>
          </ol>
        </nav>

        {/* Novel Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Basic Info */}
            <div className="lg:w-2/3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {novel.title}
                  </h1>
                  <p className="text-xl text-gray-600 mb-4">by {novel.author}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-3">
                  <div className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-2xl font-bold">{novel.rating.toFixed(1)}</span>
                    <span className="ml-1 text-sm">/ 5.0</span>
                  </div>
                  <div className="flex gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${novel.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {novel.status === 'completed' ? 'Completed' : 'Ongoing'}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {novel.chapters.toLocaleString()} chapters
                    </span>
                  </div>
                </div>
              </div>

              {/* Genres */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">GENRES</h3>
                <div className="flex flex-wrap gap-2">
                  {novel.genre.map((genre) => (
                    <Link
                      key={genre}
                      href={`/genre/${genre.toLowerCase()}`}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {genre}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">TAGS</h3>
                <div className="flex flex-wrap gap-2">
                  {novel.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
                <p className="text-gray-700 leading-relaxed">{novel.summary}</p>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Novel Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Author</div>
                    <div className="font-medium">{novel.author}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Status</div>
                    <div className="font-medium">{novel.status === 'completed' ? 'Completed' : 'Currently Publishing'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Chapters</div>
                    <div className="font-medium">{novel.chapters.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Rating</div>
                    <div className="font-medium">{novel.rating.toFixed(1)} / 5.0</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Genres</div>
                    <div className="font-medium">{novel.genre.join(', ')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Review</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="whitespace-pre-line leading-relaxed">{novel.review}</p>
          </div>
        </div>

        {/* Similar Novels */}
        {similarNovels.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Similar Novels
              </h2>
              <Link 
                href={`/similar-to/${novel.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View all similar →
              </Link>
            </div>
            <NovelGrid novels={similarNovels.slice(0, 3)} />
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex justify-between">
          <Link
            href="/"
            className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:underline"
          >
            ← Back to all novels
          </Link>
          {similarNovels.length > 0 && (
            <Link
              href={`/similar-to/${novel.slug}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View all similar novels
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}