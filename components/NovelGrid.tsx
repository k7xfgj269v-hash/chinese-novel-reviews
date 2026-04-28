import { Novel } from '@/lib/novels';
import NovelCard from './NovelCard';

interface NovelGridProps {
  novels: Novel[];
  title?: string;
  description?: string;
}

export default function NovelGrid({ novels, title, description }: NovelGridProps) {
  if (novels.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-300 dark:text-gray-600 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
          No novels found
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          Try a different search or browse all novels
        </p>
      </div>
    );
  }

  return (
    <div>
      {(title || description) && (
        <div className="mb-8">
          {title && <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}

      <div role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {novels.map((novel) => (
          <div key={novel.slug} role="listitem">
            <NovelCard novel={novel} />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        Showing {novels.length} novel{novels.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
