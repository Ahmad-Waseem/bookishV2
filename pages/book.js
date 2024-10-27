import { useState } from 'react';
import { getBooks, getGenres } from '@/lib/data';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';
import BookList from '@/components/bookList';

export default function BooksPage({ books, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('');
  console.log(genres);

  const filteredBooks = selectedGenre 
    ? books.filter(book => book.genreId === selectedGenre)
    : books;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
              Books Collection
            </h1>
          </div>
        </div>

        {/* Genre Filter */}
        <div className="mt-6">
          <label htmlFor="genre-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Genre
          </label>
          <div className="relative">
            <select
              id="genre-select"
              onChange={(evt) => setSelectedGenre(evt.target.value)}
              value={selectedGenre}
              className="block w-full md:w-64 pl-3 pr-10 py-2 text-base 
                       border-gray-300 dark:border-gray-600 
                       focus:outline-none focus:ring-green-500 focus:border-green-500 
                       dark:focus:ring-green-400 dark:focus:border-green-400
                       rounded-md shadow-sm
                       bg-white dark:bg-gray-800 
                       text-gray-900 dark:text-white
                       cursor-pointer"
            >
              <option value="" className="text-gray-900 dark:text-white">
                All Genres
              </option>
              {genres.map((genre) => (
                <option 
                  key={genre.id} 
                  value={genre.id}
                  className="text-gray-900 dark:text-white"
                >
                  {genre.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg 
                className="h-5 w-5 text-gray-400 dark:text-gray-500" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <BookList filteredBooks={filteredBooks} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const dataFilePath = path.join(process.cwd(), 'data.json');
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const books = getBooks(data);
  const genres = getGenres(data);

  if (!books) {
    return { notFound: true };
  }
  return { props: { books, genres }, revalidate: 300 };
}