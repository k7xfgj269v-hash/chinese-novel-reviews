import Link from 'next/link';
import { Novel } from '@/lib/novels';
import StarIcon from './StarIcon';

interface NovelCardProps {
  novel: Novel;
}

export default function NovelCard({ novel }: NovelCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-800">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Link href={`/novel/${novel.slug}`}>{novel.title}</Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">by {novel.author}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full">
              <StarIcon />
              <span className="font-bold">{novel.rating.toFixed(1)}</span>
            </div>
            <span
              className={`mt-2 px-2 py-1 text-xs rounded-full ${novel.status === 'completed' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300'}`}
            >
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
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {genre}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {novel.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">{novel.summary}</p>

        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span>{novel.chapters.toLocaleString()} chapters</span>
            </div>
            {novel.readingTime && <span>~{novel.readingTime}h read</span>}
            {novel.year && <span>{novel.year}</span>}
            {novel.originalLanguage && (
              <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded font-medium uppercase">
                {novel.originalLanguage}
              </span>
            )}
          </div>
          <Link
            href={`/novel/${novel.slug}`}
            aria-label={`Read review of ${novel.title}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium hover:underline whitespace-nowrap"
          >
            Read review
          </Link>
        </div>
      </div>
    </div>
  );
}
