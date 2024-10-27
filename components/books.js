import React from 'react';
import Link from 'next/link';

function FeaturedBookList({ books = [] }) {
    console.log("sent ones", books)

    return (
        <div className="container mx-auto px-4 py-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Featured Books
            </h2>
            <ul className="list-disc space-y-2">
                {books.map((book) => (
                    <li 
                        key={book.id} 
                        className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-sm 
                                 hover:shadow-md transition-shadow duration-200
                                 border border-gray-200 dark:border-gray-700"
                    >
                        <Link href={`/books/${book.id}`}>
                            <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">
                                {book.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {book.description}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Rating: {book.rating}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FeaturedBookList;