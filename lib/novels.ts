import novelsData from '@/data/novels.json';

export interface Novel {
  slug: string;
  title: string;
  author: string;
  genre: string[];
  rating: number;
  status: 'completed' | 'ongoing';
  chapters: number;
  summary: string;
  review: string;
  similar: string[];
  tags: string[];
}

// Type assertion for the imported data
const novels: Novel[] = novelsData as Novel[];

/**
 * Get all novels sorted by rating (highest first)
 */
export function getAllNovels(): Novel[] {
  return [...novels].sort((a, b) => b.rating - a.rating);
}

/**
 * Get a novel by its slug
 */
export function getNovelBySlug(slug: string): Novel | undefined {
  return novels.find(novel => novel.slug === slug);
}

/**
 * Get novels by genre
 */
export function getNovelsByGenre(genre: string): Novel[] {
  return novels.filter(novel => 
    novel.genre.map(g => g.toLowerCase()).includes(genre.toLowerCase())
  ).sort((a, b) => b.rating - a.rating);
}

/**
 * Get similar novels for a given novel slug
 */
export function getSimilarNovels(slug: string): Novel[] {
  const novel = getNovelBySlug(slug);
  if (!novel) return [];
  
  return novels.filter(n => 
    novel.similar.includes(n.slug) && n.slug !== slug
  ).sort((a, b) => b.rating - a.rating);
}

/**
 * Get all unique genres from all novels
 */
export function getAllGenres(): string[] {
  const genreSet = new Set<string>();
  novels.forEach(novel => {
    novel.genre.forEach(g => genreSet.add(g));
  });
  return Array.from(genreSet).sort();
}

/**
 * Get all novel slugs for static generation
 */
export function getAllNovelSlugs(): string[] {
  return novels.map(novel => novel.slug);
}

/**
 * Get all genre slugs for static generation
 */
export function getAllGenreSlugs(): string[] {
  return getAllGenres();
}