import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GenreSortControls from '@/components/GenreSortControls';
import StarIcon from '@/components/StarIcon';
import { getNovelsByGenre, getAllGenreSlugs, getAllGenres } from '@/lib/novels';
import { getGenreDescription } from '@/data/genre-descriptions';

interface PageProps {
  params: Promise<{ genre: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { genre } = await params;
  const novels = getNovelsByGenre(genre);

  if (novels.length === 0) {
    return {
      title: 'Genre Not Found',
      description: 'The requested genre could not be found.',
    };
  }

  const genreName = genre.charAt(0).toUpperCase() + genre.slice(1);

  return {
    title: `${genreName} Chinese Novels - Reviews & Ratings`,
    description: `Browse ${novels.length} Chinese web novels in the ${genreName} genre. Read English reviews and ratings.`,
  };
}

export async function generateStaticParams() {
  const genres = getAllGenreSlugs();
  return genres.map((genre) => ({ genre: genre.toLowerCase() }));
}

export default async function GenrePage({ params }: PageProps) {
  const { genre } = await params;
  const novels = getNovelsByGenre(genre);

  if (novels.length === 0) {
    notFound();
  }

  const genreName = genre.charAt(0).toUpperCase() + genre.slice(1);
  const allGenres = getAllGenres();

  // Compute stats
  const totalNovels = novels.length;
  const completedCount = novels.filter((n) => n.status === 'completed').length;
  const ongoingCount = novels.filter((n) => n.status === 'ongoing').length;
  const avgRating = (novels.reduce((acc, n) => acc + n.rating, 0) / totalNovels).toFixed(1);
  const avgChapters = Math.round(novels.reduce((acc, n) => acc + n.chapters, 0) / totalNovels);
  const uniqueAuthors = new Set(novels.map((n) => n.author)).size;

  // Top 3 highest-rated
  const top3 = [...novels].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">{genreName} Novels</li>
          </ol>
        </nav>

        {/* Genre Header */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {genreName} Novels
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Browse {totalNovels} Chinese web novels in the {genreName} genre
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
                <span className="text-xl font-bold">{avgChapters.toLocaleString()}</span>
                <span className="ml-1">avg ch.</span>
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

        {/* Top 3 Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Top Rated in {genreName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {top3.map((novel, index) => (
              <div
                key={novel.slug}
                className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-100 dark:border-gray-800 p-4 flex items-start gap-3 hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/novel/${novel.slug}`}
                    className="font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block truncate"
                  >
                    {novel.title}
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    by {novel.author}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {novel.rating.toFixed(1)}
                    </span>
                    <StarIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                      {novel.chapters.toLocaleString()} ch.
                    </span>
                    <span
                      className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                        novel.status === 'completed'
                          ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300'
                          : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300'
                      }`}
                    >
                      {novel.status === 'completed' ? 'Completed' : 'Ongoing'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Genre Navigation */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Browse Other Genres
          </h2>
          <div className="flex flex-wrap gap-2">
            {allGenres.map((g) => (
              <Link
                key={g}
                href={`/genre/${g.toLowerCase()}`}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  g.toLowerCase() === genre.toLowerCase()
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {g}
              </Link>
            ))}
          </div>
        </div>

        {/* Novels Grid with Sort */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {totalNovels} {genreName} Novel{totalNovels !== 1 ? 's' : ''}
            </h2>
          </div>
          <GenreSortControls novels={novels} />
        </div>

        {/* Genre Description */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            About {genreName} Novels
          </h2>
          <div className="prose max-w-none text-gray-700 dark:text-gray-300">
            {getGenreDescription(genreName)}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-between">
          <Link
            href="/"
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline"
          >
            &larr; Back to all novels
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse all genres
          </Link>
        </div>
      </div>
    </div>
  );
}
