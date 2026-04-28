'use client';

import { useState, useMemo } from 'react';
import { Novel } from '@/lib/novels';
import NovelGrid from './NovelGrid';

interface GenreSortControlsProps {
  novels: Novel[];
}

type SortOption = 'rating' | 'chapters' | 'title' | 'status';

const SORT_LABELS: Record<SortOption, string> = {
  rating: 'Rating (highest first)',
  chapters: 'Chapters (most first)',
  title: 'Title (A-Z)',
  status: 'Status (completed first)',
};

export default function GenreSortControls({ novels }: GenreSortControlsProps) {
  const [sortBy, setSortBy] = useState<SortOption>('rating');

  const sortedNovels = useMemo(() => {
    const sorted = [...novels];
    switch (sortBy) {
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'chapters':
        sorted.sort((a, b) => b.chapters - a.chapters);
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'status':
        sorted.sort((a, b) => {
          if (a.status === 'completed' && b.status !== 'completed') return -1;
          if (a.status !== 'completed' && b.status === 'completed') return 1;
          return b.rating - a.rating;
        });
        break;
    }
    return sorted;
  }, [novels, sortBy]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <label
          htmlFor="sort-select"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {Object.entries(SORT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <NovelGrid novels={sortedNovels} />
    </div>
  );
}
