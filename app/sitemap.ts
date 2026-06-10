import { MetadataRoute } from 'next';
import {
  getAllNovels,
  getAllGenres,
  getAllAuthors,
  getAllTags,
  getReadingLists,
} from '@/lib/novels';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://chinese-novel-reviews.vercel.app';

  const novels = getAllNovels().map((n) => ({
    url: `${baseUrl}/novel/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const genres = getAllGenres().map((g) => ({
    url: `${baseUrl}/genre/${g.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const authorPages = getAllAuthors().map((a) => ({
    url: `${baseUrl}/author/${encodeURIComponent(a)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  const tagPages = getAllTags().map((t) => ({
    url: `${baseUrl}/tag/${t.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }));

  const similarPages = getAllNovels().map((n) => ({
    url: `${baseUrl}/similar-to/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  const listPages = getReadingLists().map((l) => ({
    url: `${baseUrl}/lists/${l.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const indexPages = ['/lists', '/authors', '/tags'].map((path) => ({
    url: baseUrl + path,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...indexPages,
    ...novels,
    ...genres,
    ...authorPages,
    ...tagPages,
    ...similarPages,
    ...listPages,
  ];
}
