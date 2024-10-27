import useSWR from 'swr';
import Data from '/Data.json';

const fetcher = () => Data.authors;

export default function AuthorsPage() {
  const { data, error } = useSWR('/Data.json', fetcher);

  if (error) return <div className="text-red-600">Failed to load authors</div>;
  if (!data) return <div className="animate-pulse">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Authors</h1>
      <ul className="space-y-4">
        {data.map((author) => (
          <li key={author.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{author.name}</h2>
            <p className="text-gray-700 dark:text-gray-300">{author.biography}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
