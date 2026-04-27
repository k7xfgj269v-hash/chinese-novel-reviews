import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NovelGrid from '@/components/NovelGrid';
import StarIcon from '@/components/StarIcon';
import { getNovelsByGenre, getAllGenreSlugs, getAllGenres } from '@/lib/novels';

interface PageProps {
  params: Promise<{ genre: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { genre } = await params;
  const novels = getNovelsByGenre(genre);
  
  if (novels.length === 0) {
    return {
      title: 'Genre Not Found',
      description: 'The requested genre could not be found.',
    };
  }
  
  const genreName = genre.charAt(0).toUpperCase() + genre.slice(1);
  
  return {
    title: `${genreName} Chinese Novels - Reviews & Ratings`,
    description: `Browse ${novels.length} Chinese web novels in the ${genreName} genre. Read English reviews and ratings.`,
  };
}

export async function generateStaticParams() {
  const genres = getAllGenreSlugs();
  return genres.map((genre) => ({ genre: genre.toLowerCase() }));
}

export default async function GenrePage({ params }: PageProps) {
  const { genre } = await params;
  const novels = getNovelsByGenre(genre);
  
  if (novels.length === 0) {
    notFound();
  }
  
  const genreName = genre.charAt(0).toUpperCase() + genre.slice(1);
  const allGenres = getAllGenres();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{genreName} Novels</li>
          </ol>
        </nav>

        {/* Genre Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {genreName} Novels
              </h1>
              <p className="text-gray-600">
                Browse {novels.length} Chinese web novels in the {genreName} genre
              </p>
            </div>
            <div className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              <StarIcon className="w-5 h-5 mr-2" />
              <span className="text-xl font-bold">
                {(novels.reduce((acc, novel) => acc + novel.rating, 0) / novels.length).toFixed(1)}
              </span>
              <span className="ml-1">avg rating</span>
            </div>
          </div>
        </div>

        {/* Genre Navigation */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Browse Other Genres</h2>
          <div className="flex flex-wrap gap-2">
            {allGenres.map((g) => (
              <Link
                key={g}
                href={`/genre/${g.toLowerCase()}`}
                className={`px-4 py-2 rounded-lg transition-colors ${g.toLowerCase() === genre.toLowerCase() 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                {g}
              </Link>
            ))}
          </div>
        </div>

        {/* Novels Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {novels.length} {genreName} Novel{novels.length !== 1 ? 's' : ''}
            </h2>
            <div className="text-gray-600">
              Sorted by rating (highest first)
            </div>
          </div>
          <NovelGrid novels={novels} />
        </div>

        {/* Genre Description */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About {genreName} Novels</h2>
          <div className="prose max-w-none text-gray-700">
            {getGenreDescription(genreName)}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-between">
          <Link
            href="/"
            className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:underline"
          >
            ← Back to all novels
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse all genres
          </Link>
        </div>
      </div>
    </div>
  );
}

function getGenreDescription(genre: string): string {
  const descriptions: Record<string, string> = {
    'Action': 'Fast-paced combat and high-stakes confrontations drive the narrative. Expect intense battle sequences, martial arts showcases, and protagonists who solve problems through overwhelming force and skill.',
    'Apocalypse': 'Civilization has collapsed — now survival is the only rule. These novels explore how humanity adapts to world-ending catastrophes, mutated creatures, and the breakdown of social order, often with sci-fi or supernatural twists.',
    'Business': 'Empire-building through commerce and strategy rather than combat. Protagonists use modern business knowledge, economic manipulation, and entrepreneurial cunning to build dynasties in historical or contemporary settings.',
    'Classic': 'Foundational works that defined the genre conventions readers know today. These novels established the tropes, power systems, and storytelling patterns that countless later works would follow and subvert.',
    'Comedy': 'Humor takes center stage through absurd situations, witty dialogue, and characters who defy genre expectations. These novels balance laughs with genuine plot progression, creating stories that never take themselves too seriously.',
    'Cultivation': 'The core of Chinese web fiction — characters absorb spiritual energy, breakthrough realm after realm, and pursue immortality. Power progression through meditation, pills, and enlightenment forms the backbone of these sprawling epics.',
    'Cyberpunk': 'High-tech meets low-life in dystopian futures where megacorporations rule and hackers fight the system. Neural implants, virtual realities, and the question of what it means to be human define this gritty subgenre.',
    'Dark': 'Morality is grey, victories come at a cost, and happy endings are never guaranteed. These novels embrace tragic backstories, ruthless protagonists, and worlds where idealism gets people killed.',
    'Epic': 'Vast in scope and ambition, spanning continents, generations, or entire universes. Massive ensemble casts, world-altering conflicts, and plotlines that build over thousands of chapters distinguish these monumental works.',
    'Esports': 'Professional gaming as a legitimate career and cultural phenomenon. These novels capture the thrill of competition, team dynamics, and the journey from unknown player to legendary champion.',
    'Family': 'Blood ties and clan politics shape the protagonist\'s path. Family obligations, ancestral legacies, and protecting loved ones provide the emotional core that drives character decisions and plot development.',
    'Fantasy': 'Magic, mythical beasts, and worlds unbound by the laws of physics. Chinese fantasy often blends Western fantasy elements with Eastern mythology, creating unique settings where sword and sorcery meet cultivation.',
    'Gaming': 'Virtual reality or game-like systems structure the world itself. Characters level up, unlock skills, and exploit game mechanics in worlds that blur the line between play and reality.',
    'Hard-sci-fi': 'Science grounded in real physics and plausible extrapolation. These novels take scientific accuracy seriously, exploring the implications of evolution, space travel, and technological change with intellectual rigor.',
    'Historical': 'Richly detailed recreations of dynastic China, where politics, warfare, and culture come alive. Historical novels weave fictional characters into real events or reimagine history through transmigration and alternate outcomes.',
    'Horror': 'Fear is the primary emotion — psychological dread, cosmic horror, and survival terror. These novels build tension through atmosphere and the unknown, often revealing that the real monsters are human nature itself.',
    'Infinite-flow': 'Protagonists are pulled into an endless series of deadly scenarios — survival games, horror movie worlds, puzzle chambers. Only wit, skill, and sheer willpower let them survive long enough to uncover the truth behind the system.',
    'Kingdom-building': 'From small village to continental empire — these novels focus on organizational growth. Technology uplift, political maneuvering, infrastructure development, and managing subordinates matter as much as personal power.',
    'Lovecraftian': 'Eldritch horrors, cosmic indifference, and the fragility of human sanity. Inspired by Lovecraft\'s mythos, these novels pit protagonists against unknowable entities where the greatest danger is comprehending too much.',
    'Martial-arts': 'Pure combat skill honed through discipline and technique rather than spiritual energy. Martial artists train their bodies to supernatural levels through forms, techniques, and battle experience in worlds inspired by wuxia tradition.',
    'Mecha': 'Giant robots, powered armor, and mechanical warfare. Pilots bond with their machines in battles that combine technical strategy with raw firepower, from military sci-fi to game-world mecha customization.',
    'Medical': 'The scalpel is mightier than the sword. Protagonists use modern medical knowledge — surgery, pharmacology, diagnostics — to save lives, build influence, and navigate worlds where healers are undervalued until they\'re indispensable.',
    'Mmorpg': 'Massively multiplayer online games as fully realized worlds with economies, guild politics, and legendary raids. These novels capture the social dynamics and emergent storytelling that make virtual worlds feel alive.',
    'Modern': 'Contemporary settings where cultivation, systems, or supernatural elements collide with modern life. College campuses, corporate offices, and city streets become the backdrop for extraordinary abilities hidden in plain sight.',
    'Mystery': 'Secrets drive the plot — ancient conspiracies, locked-room puzzles, and slow-burn revelations. Protagonists piece together clues while navigating treacherous social webs where everyone has something to hide.',
    'Mythology': 'Gods, divine beasts, and creation myths aren\'t just stories — they\'re real and active in the world. Chinese, Greek, Norse, and original pantheons collide as mortals navigate the machinations of divine powers.',
    'Philosophical': 'Beyond the action, these novels grapple with big questions — the nature of consciousness, the meaning of immortality, free will versus fate. Expect protagonists who spend as much time contemplating the Dao as they do fighting.',
    'Political': 'Palace intrigue, succession crises, and the art of governance. Victory comes through alliances, betrayals, and clever manipulation rather than brute force — though a well-timed assassination never hurts.',
    'Psychological': 'The battlefield is the mind. These novels delve into trauma, manipulation, identity, and the darker corners of human consciousness, often blurring the line between protagonist and unreliable narrator.',
    'Revenge': 'A wronged protagonist rises from the ashes with a singular goal: payback. The satisfaction comes from watching meticulously planned vengeance unfold against seemingly insurmountable odds.',
    'Romance': 'Relationships take center stage — from slow-burn courtship to polyamorous harems. Emotional connections, romantic tension, and character chemistry drive the narrative alongside whatever cultivation or action elements are present.',
    'Sci-fi': 'Futuristic technology, space exploration, and speculative science shape these worlds. Chinese sci-fi often explores the intersection of advanced civilization with human nature, social structures, and the unknown cosmos.',
    'Slice-of-life': 'The quiet moments matter. These novels find drama and warmth in everyday interactions, character relationships, and the small victories that make a life — even an immortal one — worth living.',
    'Slow-burn': 'Patience is rewarded. These novels take their time building characters, relationships, and world-defining conflicts, trusting that careful setup pays off with deeper emotional impact when the payoff finally arrives.',
    'Steampunk': 'Victorian aesthetics meet clockwork technology and industrial revolution energy. Gears, airships, and alchemy create worlds where steam power rivals magic, and class struggle brews beneath gaslit streets.',
    'Strategy': 'Victory belongs to the cleverest, not the strongest. Every battle is a chess match — positioning, resource management, and outthinking opponents matter more than raw power levels or cultivation speed.',
    'Supernatural': 'Ghosts, psychic abilities, and phenomena beyond scientific explanation. The veil between worlds is thin, and protagonists navigate what lurks on the other side while keeping one foot in normal society.',
    'Survival': 'Every resource counts, every decision could be fatal. From wilderness survival to death game scenarios, these novels strip away safety nets and force characters to earn their continued existence.',
    'System': 'A game-like interface overlays reality — quests, stat screens, skill trees, and level-ups. The System may be a tool, a prison, or something in between, but it fundamentally reshapes how protagonists interact with their world.',
    'Teamwork': 'No lone wolves here. These novels emphasize cooperation, squad dynamics, and the strength that comes from trusting others with complementary skills. Victory is a team effort, not a solo achievement.',
    'Technology': 'Innovation changes the world. Protagonists introduce modern technology — computing, engineering, industrial methods — into less advanced settings, sparking societal transformation and attracting both allies and enemies.',
    'Tragic': 'Loss is inevitable and suffering is transformative. These novels don\'t flinch from killing beloved characters, destroying hard-won progress, and forcing protagonists to find meaning in worlds that have taken everything from them.',
    'Wuxia': 'Martial heroes (武侠) grounded in honor, brotherhood, and the jianghu underworld. Unlike xianxia\'s cosmic scale, wuxia stays closer to human concerns — loyalty, vengeance, and the code of the wandering swordsman.',
    'Xianxia': 'Immortal heroes (仙侠) ascend through cultivation realms toward godhood. Dao comprehension, heavenly tribulations, and the brutal competition for cultivation resources define a genre where the strong write the rules and the weak are stepping stones.',
  };

  return descriptions[genre] || `${genre} novels offer a distinctive flavor of Chinese web fiction. These stories blend engaging characters with creative world-building, delivering the narrative depth and addictive pacing that readers worldwide have come to love.`;
}