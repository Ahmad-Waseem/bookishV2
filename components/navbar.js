import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);

    document.documentElement.classList.toggle('dark');

    localStorage.theme = darkMode ? 'light' : 'dark';
  };

  return (
    <nav className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-gray-700 dark:text-white">Home</Link>
          </li>
          <li>
            <Link href="/book" className="text-gray-700 dark:text-white">Books</Link>
          </li>
          <li>
            <Link href="/genre" className="text-gray-700 dark:text-white">Genres</Link>
          </li>
          <li>
            <Link href="/authors" className="text-gray-700 dark:text-white">Authors</Link>
          </li>
          <li>
            <Link href="/info/faqs" className="text-gray-700 dark:text-white">Info</Link>
          </li>
          <li>
            <Link href="/search" className="text-gray-700 dark:text-white">Search Books</Link>
          </li>
        </ul>
        
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white"
          aria-label="Toggle theme"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}