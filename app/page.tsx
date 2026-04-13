import { Metadata } from 'next';
import NovelGrid from '@/components/NovelGrid';
import { getAllNovels, getAllGenres } from '@/lib/novels';

export const metadata: Metadata = {
  title: 'Chinese Novel Reviews - English Reviews of Chinese Web Novels',
  description: 'Browse English reviews and ratings of popular Chinese web novels. Find your next cultivation, xianxia, or fantasy novel to read.',
};

export default function Home() {
  const novels = getAllNovels();
  const genres = getAllGenres();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Chinese Novel Reviews
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            English reviews and ratings of popular Chinese web novels. 
            Find your next cultivation, xianxia, or fantasy adventure.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{novels.length}</div>
              <div className="text-gray-600">Novels Reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {novels.reduce((acc, novel) => acc + novel.rating, 0) / novels.length > 0 
                  ? (novels.reduce((acc, novel) => acc + novel.rating, 0) / novels.length).toFixed(1)
                  : '0.0'}
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{genres.length}</div>
              <div className="text-gray-600">Genres</div>
            </div>
          </div>
        </div>

        {/* Genres Navigation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Genre</h2>
          <div className="flex flex-wrap gap-3">
            {genres.map((genre) => (
              <a
                key={genre}
                href={`/genre/${genre.toLowerCase()}`}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
              >
                {genre}
              </a>
            ))}
          </div>
        </div>

        {/* Featured Novels */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Top Rated Novels</h2>
            <div className="text-gray-600">
              Sorted by rating (highest first)
            </div>
          </div>
          <NovelGrid novels={novels} />
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>
            All reviews are written in English for international readers. 
            Data is sourced from community ratings and expert reviews.
          </p>
        </div>
      </div>
    </div>
  );
}
