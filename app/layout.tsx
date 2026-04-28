import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Chinese Novel Reviews - English Reviews of Chinese Web Novels',
    template: '%s | Chinese Novel Reviews',
  },
  description:
    'Browse English reviews and ratings of popular Chinese web novels. Find your next cultivation, xianxia, or fantasy novel to read.',
  keywords: [
    'chinese novels',
    'web novels',
    'cultivation',
    'xianxia',
    'fantasy',
    'book reviews',
    'english reviews',
  ],
  authors: [{ name: 'Chinese Novel Reviews' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chinese-novel-reviews.vercel.app',
    title: 'Chinese Novel Reviews - English Reviews of Chinese Web Novels',
    description: 'Browse English reviews and ratings of popular Chinese web novels.',
    siteName: 'Chinese Novel Reviews',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chinese Novel Reviews - English Reviews of Chinese Web Novels',
    description: 'Browse English reviews and ratings of popular Chinese web novels.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning style={{ visibility: 'hidden' }}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
              document.documentElement.style.visibility = '';
            } catch(e) {
              document.documentElement.style.visibility = '';
            }
          })();
        `,
          }}
        />
        <noscript dangerouslySetInnerHTML={{ __html: '<style>html{visibility:visible}</style>' }} />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CN Reviews" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-blue-600 focus:text-white focus:outline-none"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <footer aria-label="Footer" className="bg-gray-900 dark:bg-gray-900 text-white py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Chinese Novel Reviews</h3>
                <p className="text-gray-400">English reviews of Chinese web novels</p>
              </div>
              <div className="text-gray-400 text-sm">
                <p>Copyright {new Date().getFullYear()} Chinese Novel Reviews</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
