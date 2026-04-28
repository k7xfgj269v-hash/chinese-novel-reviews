# Chinese Novel Reviews

Next.js 16 App Router + Tailwind CSS 4 + TypeScript SSG site for English reviews of Chinese web novels.

## Commands
- `npm run dev` — start dev server (port 3000)
- `npm run build` — production build (SSG export)
- `npm start` — serve production build

## Architecture
```
app/
├── page.tsx              # Homepage — search + grid + stats
├── layout.tsx             # Root layout — Inter font + Nav + Footer
├── loading.tsx            # Homepage skeleton
├── not-found.tsx          # Custom 404
├── robots.ts / sitemap.ts # SEO
├── novel/[slug]/page.tsx  # Single novel detail + JSON-LD
├── novel/[slug]/loading.tsx
├── genre/[genre]/page.tsx # Genre listing
├── genre/[genre]/loading.tsx
├── similar-to/[slug]/page.tsx  # Similar novel recommendations
components/
├── Navigation.tsx    # Nav bar — dark mode toggle, genre dropdown
├── NovelCard.tsx     # Novel card in grids
├── NovelGrid.tsx     # Responsive grid (1/2/3 cols)
├── SearchBar.tsx     # Client-side search with debounce
├── StarIcon.tsx      # SVG star for ratings
data/
├── novels.json       # 35 novels with reviews
├── genre-descriptions.ts  # Genre explanation text
lib/
├── novels.ts         # Data access functions — getAllNovels, getNovelBySlug, etc.
```

## Key conventions
- All data in `data/novels.json` — add novels there, SSG picks them up automatically
- Routes are fully static — `output: "export"` in next.config
- Dark mode via `dark` class on `<html>`, persisted in localStorage
- Tailwind CSS 4 with `@theme inline` in globals.css
- Font: Inter (loaded via next/font/google in layout.tsx)

## Adding a novel
1. Add entry to `data/novels.json` with all required fields (slug, title, author, genre[], rating, status, chapters, summary, review, similar[], tags[])
2. Ensure `similar` slugs reference existing novels
3. Run `npm run build` — pages auto-generated via `generateStaticParams()`
