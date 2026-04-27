# Chinese Novel Reviews

An English review website for Chinese web novels built with Next.js 14 (App Router) and Tailwind CSS.

**[Live Demo](https://chinese-novel-reviews.vercel.app/)**

## Features

- **4 Page Types**: Homepage, Novel details, Genre pages, Similar recommendations
- **JSON Data Driven**: All data stored in `data/novels.json`
- **Static Site Generation (SSG)**: All pages pre-rendered for optimal performance
- **SEO Optimized**: Dynamic metadata for each page
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety

## Project Structure

```
chinese-novel-reviews/
├── data/
│   └── novels.json          # All novel data
├── app/
│   ├── page.tsx             # Homepage
│   ├── novel/
│   │   └── [slug]/
│   │       └── page.tsx     # Single novel page
│   ├── genre/
│   │   └── [genre]/
│   │       └── page.tsx     # Genre listing page
│   └── similar-to/
│       └── [slug]/
│           └── page.tsx     # Similar novels page
├── components/
│   ├── NovelCard.tsx        # Novel card component
│   ├── NovelGrid.tsx        # Novel grid layout
│   └── Navigation.tsx       # Site navigation
└── lib/
    └── novels.ts            # Data utility functions
```

## Data Structure

Each novel in `novels.json` has the following structure:

```json
{
  "slug": "example-novel",
  "title": "Example Novel",
  "author": "Author Name",
  "genre": ["cultivation", "fantasy"],
  "rating": 4.0,
  "status": "completed",
  "chapters": 1200,
  "summary": "A short summary of the novel...",
  "review": "Your detailed review...",
  "similar": ["another-novel-slug"],
  "tags": ["tag1", "tag2"]
}
```

## Getting Started

### Prerequisites
- Node.js 18+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/k7xfgj269v-hash/chinese-novel-reviews.git
cd chinese-novel-reviews
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Pages

### 1. Homepage (`/`)
- Displays all novels sorted by rating
- Genre navigation
- Site statistics

### 2. Novel Page (`/novel/[slug]`)
- Detailed novel information
- Summary and review
- Similar novels preview
- Genre and tag navigation

### 3. Genre Page (`/genre/[genre]`)
- All novels in a specific genre
- Genre description
- Cross-genre navigation

### 4. Similar Novels Page (`/similar-to/[slug]`)
- Novels similar to a specific book
- Comparison of shared genres and tags
- Navigation back to original novel

## SEO Features

- Dynamic metadata for each page
- Open Graph and Twitter card support
- Semantic HTML structure
- Responsive meta tags
- JSON-LD ready structure

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure the build

The site uses Static Site Generation (SSG) which works perfectly with Vercel's edge network.

## Adding New Novels

To add a new novel:

1. Add a new entry to `data/novels.json`
2. Ensure all required fields are present
3. Add valid `similar` novel slugs (must exist in the data)
4. The site will automatically generate new pages on next build

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **JSON** - Data storage
- **SSG** - Static Site Generation for performance

## License

MIT