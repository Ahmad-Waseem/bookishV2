import { getBooks, getAuthors, getGenres } from '@/lib/data';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';

export default function BookDetails({ book, author, genre }) {
  if (!book || !author || !genre) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse text-xl text-gray-600 dark:text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Book Header */}
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {book.title}
          </h1>

          {/* Rating and Price Banner */}
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full 
                           text-sm font-medium bg-green-100 dark:bg-green-900 
                           text-green-800 dark:text-green-100">
              Rating: {book.rating} ★
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full 
                           text-sm font-medium bg-blue-100 dark:bg-blue-900 
                           text-blue-800 dark:text-blue-100">
              ${book.price}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
            {book.description}
          </p>

          {/* Book Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-t border-b 
                         border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Genre
              </h2>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">
                {genre.name}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Author
              </h2>
              <Link 
                href={`/books/${book.id}/author`}
                className="mt-1 text-lg text-green-600 dark:text-green-400 
                         hover:text-green-700 dark:hover:text-green-300 
                         transition-colors duration-200 inline-block"
              >
                {author.name}
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <Link
              href="/book"
              className="inline-flex items-center px-4 py-2 border border-transparent 
                       text-sm font-medium rounded-md shadow-sm text-white 
                       bg-green-600 hover:bg-green-700 dark:bg-green-500 
                       dark:hover:bg-green-600 transition-colors duration-200"
            >
              See All Books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
    const dataFilePath = path.join(process.cwd(), 'data.json');
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    const data = JSON.parse(jsonData);
    const books = getBooks(data);
  
    const paths = books.map((book) => ({
      params: { id: book.id },
    }));
  
    return { paths, 
        fallback: true };
  }
  
  export async function getStaticProps({ params }) {
    const dataFilePath = path.join(process.cwd(), 'data.json');
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    const data = JSON.parse(jsonData);

    const books = getBooks(data);
    const authors = getAuthors(data);
    const genres = getGenres(data);
  
    // books rendered
    const book = books.find((b) => b.id === params.id);

    if (!book) {
      return { notFound: true }; 
    }
    //needed authors
    const author = authors.find((a) => a.id === book.authorId);
    
    //needed genres
    const genre = genres.find((g) => g.id === book.genreId);
    
    return { props: { book, author, genre }, revalidate: 300, };
  }