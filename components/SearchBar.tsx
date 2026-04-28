'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Novel } from '@/lib/novels';

export default function SearchBar({ novels }: { novels: Novel[] }) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, 300);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setQuery('');
      setDebouncedQuery('');
      (e.target as HTMLInputElement).blur();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const filtered = debouncedQuery.trim()
    ? novels.filter((n) => {
        const q = debouncedQuery.toLowerCase();
        return (
          n.title.toLowerCase().includes(q) ||
          n.author.toLowerCase().includes(q) ||
          n.genre.some((g) => g.toLowerCase().includes(q)) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search novels, authors, genres, tags..."
        role="combobox"
        aria-expanded={query.trim() !== '' && filtered.length > 0}
        aria-controls="search-results"
        aria-label="Search novels"
        aria-autocomplete="list"
        className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <svg
        className="absolute left-3 top-3.5 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {query.trim() && (
        <div
          id="search-results"
          role="listbox"
          className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-80 overflow-y-auto"
        >
          {filtered.length > 0 ? (
            filtered.slice(0, 8).map((novel) => (
              <a
                key={novel.slug}
                href={`/novel/${novel.slug}`}
                role="option"
                className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-b border-gray-100 dark:border-gray-700 last:border-0"
              >
                <div className="font-medium text-gray-900 dark:text-gray-100">{novel.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {novel.author} &middot; {novel.rating.toFixed(1)} &middot;{' '}
                  {novel.genre.slice(0, 3).join(', ')}
                </div>
              </a>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-sm">
              No novels found for &quot;{debouncedQuery}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
