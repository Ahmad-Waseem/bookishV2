import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Book from '@/models/Book';
import Author from '@/models/Author';
import Genre from '@/models/Genre';
import dbConnect from '@/lib/mongoose';

export default function BookDetails({ book, author, genre }) {
  const { user } = useAuth(); // Get user Auth context
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login'); // Redirect
    } else {
      setLoading(false);
    }
  }, [user]);



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
                Author {console.log("*********************", book._id)}
              </h2>
              <Link 
              
                href={`/books/${book._id}/author`}
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
  dbConnect();
  const books = await Book.find().select('_id'); //IDs of books

  const paths = books.map((book) => ({
    params: { id: book._id.toString() }, // Convert ObjectId to string
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const book = await Book.findById(params.id).lean(); // Fetch book by ID
  const author = await Author.findOne({ id: book.authorId }).lean();
  const genre = await Genre.findOne({ id: book.genreId }).lean();
  console.log("-----============================", author,genre," --------------------------")
  if (!book) {
    return { notFound: true }; 
  }

  return {
    props: { book: JSON.parse(JSON.stringify(book)), author: JSON.parse(JSON.stringify(author)), genre: JSON.parse(JSON.stringify(genre)) },
    revalidate: 300,
  };
}