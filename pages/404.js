import Link from 'next/link';

export default function notFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">(*╯-╰)ノ You don't always get what you want!</p>
      <Link href="/">
        <p className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
          Go Back to Homepage
        </p>
      </Link>
    </div>
  );
}
