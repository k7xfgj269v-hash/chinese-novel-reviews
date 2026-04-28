'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAllGenres } from '@/lib/novels';

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const genres = useMemo(() => getAllGenres(), []);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDark(isDark);
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch(e) {}
  }

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">CN</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100 hidden sm:inline">
                Chinese Novel Reviews
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100 sm:hidden">
                CN Reviews
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/')
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
            >
              Home
            </Link>

            {/* Genres Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setIsGenreOpen(!isGenreOpen)}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center"
              >
                Genres
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 transition-all duration-200 border border-gray-200 dark:border-gray-700 ${
                isGenreOpen
                  ? 'opacity-100 visible'
                  : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'
              }`}>
                {genres.map((genre) => (
                  <Link
                    key={genre}
                    href={`/genre/${genre.toLowerCase()}`}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsGenreOpen(false)}
                  >
                    {genre}
                  </Link>
                ))}
              </div>
              {isGenreOpen && (
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsGenreOpen(false)}
                />
              )}
            </div>

            <a
              href="https://github.com/k7xfgj269v-hash/chinese-novel-reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              GitHub
            </a>
            <button
              onClick={toggleDark}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {dark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <div className="px-3 py-2">
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Genres</div>
                <div className="grid grid-cols-2 gap-2">
                  {genres.map((genre) => (
                    <Link
                      key={genre}
                      href={`/genre/${genre.toLowerCase()}`}
                      className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {genre}
                    </Link>
                  ))}
                </div>
              </div>

              <a
                href="https://github.com/k7xfgj269v-hash/chinese-novel-reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                GitHub
              </a>
              <button
                onClick={() => { toggleDark(); setIsMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {dark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
