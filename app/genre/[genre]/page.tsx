import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NovelGrid from '@/components/NovelGrid';
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
            <li className="text-gray-900 font-medium">{genreName} Novels</li>
          </ol>
        </nav>

        {/* Genre Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {genreName} Novels
              </h1>
              <p className="text-gray-600">
                Browse {novels.length} Chinese web novels in the {genreName} genre
              </p>
            </div>
            <div className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              <StarIcon className="w-5 h-5 mr-2" />
              <span className="text-xl font-bold">
                {(novels.reduce((acc, novel) => acc + novel.rating, 0) / novels.length).toFixed(1)}
              </span>
              <span className="ml-1">avg rating</span>
            </div>
          </div>
        </div>

        {/* Genre Navigation */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Browse Other Genres</h2>
          <div className="flex flex-wrap gap-2">
            {allGenres.map((g) => (
              <Link
                key={g}
                href={`/genre/${g.toLowerCase()}`}
                className={`px-4 py-2 rounded-lg transition-colors ${g.toLowerCase() === genre.toLowerCase() 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                {g}
              </Link>
            ))}
          </div>
        </div>

        {/* Novels Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {novels.length} {genreName} Novel{novels.length !== 1 ? 's' : ''}
            </h2>
            <div className="text-gray-600">
              Sorted by rating (highest first)
            </div>
          </div>
          <NovelGrid novels={novels} />
        </div>

        {/* Genre Description */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About {genreName} Novels</h2>
          <div className="prose max-w-none text-gray-700">
            {getGenreDescription(genreName)}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-between">
          <Link
            href="/"
            className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:underline"
          >
            ← Back to all novels
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
