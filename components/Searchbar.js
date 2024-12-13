import { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import { useAuth } from '@/context/AuthContext';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultTerm, setResultTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch recent searches from the API when the component mounts
    const fetchRecentSearches = async () => {
      const response = await fetch('http://localhost:3000/api/user', {
        headers: {
          'Content-Type': 'application/json',
          'user-id': user?.userId
        }
      });
      if (response.ok) {
        const data = await response.json();
        setRecentSearches(data.searchHistory || []);
      }
    };
    fetchRecentSearches();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) return;


    const updatedSearches = [searchTerm, ...recentSearches.filter((item) => item !== searchTerm)].slice(0, 3);
    setRecentSearches(updatedSearches);


    await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-id': user?.userId
      },
      body: JSON.stringify({ query: searchTerm }), // Send search term to API
    });

    setResultTerm(searchTerm);
    // Clear the search input
    setSearchTerm('');
  };

  return (
    <div className="search-bar bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for books"
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
        <button 
          onClick={handleSearch} 
          className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors duration-200"
        >
          Search
        </button>
      </div>

      <div className="recent-searches mt-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Recent Searches:</h3>
        <ul>
          {recentSearches.map((item, index) => (
            <li 
              key={index} 
              className="text-gray-700 cursor-pointer hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400" 
              onClick={() => setSearchTerm(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <SearchResults searchText={resultTerm} />
    </div>
  );
}
