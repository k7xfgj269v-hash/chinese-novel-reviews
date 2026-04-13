import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NovelGrid from '@/components/NovelGrid';
import { getNovelsByGenre, getAllGenreSlugs, getAllGenres } from '@/lib/novels';

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
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
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

function getGenreDescription(genre: string): string {
  const descriptions: Record<string, string> = {
    'Cultivation': 'Cultivation novels focus on characters who practice martial arts or mystical techniques to gain power, achieve immortality, and ascend to higher realms of existence. These stories often feature detailed power systems, progression, and spiritual enlightenment.',
    'Fantasy': 'Chinese fantasy novels blend traditional mythology with imaginative world-building. They often feature magic, mythical creatures, and epic quests in richly detailed settings inspired by Chinese folklore and history.',
    'Xianxia': 'Xianxia (仙侠) translates to "immortal heroes" and features characters who cultivate to become immortals or gods. These novels emphasize dao comprehension, tribulations, and ascending through different realms of existence.',
    'Harem': 'Harem novels feature a protagonist who develops romantic relationships with multiple characters. These stories often combine romance with action, adventure, or cultivation elements.',
    'Action': 'Action-packed novels focus on combat, adventure, and thrilling sequences. They often feature skilled martial artists, strategic battles, and intense confrontations.',
    'Epic': 'Epic novels tell grand, sweeping stories that span long time periods, multiple generations, or vast worlds. They feature complex plots, large casts of characters, and world-changing events.',
    'Sci-fi': 'Chinese science fiction novels blend futuristic technology with traditional elements. They often explore themes of space exploration, advanced civilizations, and the intersection of technology with cultivation or mystical powers.',
  };
  
  return descriptions[genre] || `Chinese ${genre.toLowerCase()} novels offer unique storytelling that blends traditional Chinese elements with the ${genre.toLowerCase()} genre. These stories provide engaging narratives for international readers interested in Chinese web literature.`;
}