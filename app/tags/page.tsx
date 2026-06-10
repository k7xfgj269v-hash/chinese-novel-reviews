import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { getTagsWithCounts } from '@/lib/novels';

export const metadata: Metadata = {
  title: 'All Tags - Chinese Web Novel Reviews',
  description:
    'Browse all tags across Chinese and Korean web novels reviewed on the site. Discover novels by theme, trope, and setting with English reviews and ratings.',
};

export default function TagsPage() {
  const tags = getTagsWithCounts();
  const maxCount = tags.length > 0 ? tags[0].count : 1;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tags' }]} />

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Tags
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            {tags.length} tags across all reviewed novels. Larger tags cover more novels — click any
            to explore.
          </p>
        </div>

        {/* Tag Cloud */}
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => {
            // Scale font size 0.85rem–1.5rem by relative frequency
            const scale = 0.85 + (tag.count / maxCount) * 0.65;
            return (
              <Link
                key={tag.name}
                href={`/tag/${tag.name.toLowerCase()}`}
                style={{ fontSize: `${scale}rem` }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                {tag.name}
                <span className="text-xs text-gray-400 dark:text-gray-500">{tag.count}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
