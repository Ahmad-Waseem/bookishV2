import Link from 'next/link';
import { getGenres } from '../lib/data';
import path from 'path';
import fs from 'fs';

export async function getServerSideProps() {
  const dataFilePath = path.join(process.cwd(), 'Data.json');
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  const data = JSON.parse(jsonData);

  return { props: { genres: getGenres(data) } };
}

export default function GenresPage({ genres }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Book Genres
      </h1>
      <ul className="space-y-4">
        {genres.map((genre) => (
          <li key={genre.id} className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md transition-transform transform hover:scale-105">
            <Link href={`/genre/${genre.id}`} className="text-lg text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200">
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}