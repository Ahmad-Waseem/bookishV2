import Link from 'next/link';

const BookList = ({ filteredBooks }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <li 
            key={book.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg 
                     transition-shadow duration-200 overflow-hidden border 
                     border-gray-200 dark:border-gray-700"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 
                           truncate hover:text-green-600 dark:hover:text-green-400">
                {book.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {book.description}
              </p>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  ${book.price}
                </span>
                
                <Link 
                  href={`/books/${book.id}`}
                  className="inline-flex items-center justify-center px-4 py-2 
                           bg-green-600 hover:bg-green-700 dark:bg-green-500 
                           dark:hover:bg-green-600 text-white font-medium 
                           rounded-lg transition-colors duration-200 text-sm
                           focus:outline-none focus:ring-2 focus:ring-offset-2 
                           focus:ring-green-500 dark:focus:ring-offset-gray-800"
                >
                  View Details
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No books found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookList;