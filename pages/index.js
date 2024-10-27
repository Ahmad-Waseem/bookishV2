import { useRouter } from 'next/router';
import FeaturedBookList from "@/components/books";
import { promises as fs } from 'fs';
import path from 'path';

export default function Home({featuredBooks = []}) {
  const router = useRouter();

  const handleViewGenres = () => {
    router.push('/genre');
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl mb-6">
            Welcome to 
            <span className="text-green-600 dark:text-green-400 ml-2">
              Bookish
            </span>
          </h1>
          
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-lg max-w-xl mx-auto">
            For the Readers who write their Destiny,
            the ones who learn from history & build Future!
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg 
                       text-white bg-green-600 hover:bg-green-700 
                       dark:bg-green-500 dark:hover:bg-green-600 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 
                       dark:focus:ring-offset-gray-900 transition-colors duration-200"
              onClick={handleViewGenres}
            >
              View Genres
            </button>
          </div>
        </div>

        {/* Featured Books Section */}
        <div className="mt-8">
          {featuredBooks && <FeaturedBookList books={featuredBooks}/>}
        </div>

      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const filePath = path.join(process.cwd(), 'Data.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    
    const data = JSON.parse(jsonData);

    return {
      props: {
        featuredBooks: data.books || [],
        genres: data.genres || [],
      },
    };
  } catch (error) {
    console.error('Error loading data:', error);
    return {
      props: {
        books: [],
        genres: [],
      },
    };
  }
}