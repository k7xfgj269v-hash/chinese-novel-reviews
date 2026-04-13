import Link from 'next/link';
import { Novel } from '@/lib/novels';

interface NovelCardProps {
  novel: Novel;
}

export default function NovelCard({ novel }: NovelCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              <Link href={`/novel/${novel.slug}`}>
                {novel.title}
              </Link>
            </h2>
            <p className="text-gray-600 mt-1">by {novel.author}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold">{novel.rating.toFixed(1)}</span>
            </div>
            <span className={`mt-2 px-2 py-1 text-xs rounded-full ${novel.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {novel.status === 'completed' ? 'Completed' : 'Ongoing'}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {novel.genre.slice(0, 3).map((genre) => (
              <Link 
                key={genre} 
                href={`/genre/${genre.toLowerCase()}`}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
              >
                {genre}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {novel.tags.slice(0, 4).map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="text-gray-700 line-clamp-3 mb-4">
          {novel.summary}
        </p>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{novel.chapters.toLocaleString()} chapters</span>
          </div>
          <Link 
            href={`/novel/${novel.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
          >
            Read review →
          </Link>
        </div>
      </div>
    </div>
  );
}