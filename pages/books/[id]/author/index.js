import { getBooks, getAuthors } from '@/lib/data';
import path from 'path';
import fs from 'fs';
import { notFound } from 'next/navigation';

export default function AuthorDetails({ author, book }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          About the Author: <></>{author.name}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {author.biography}
        </p>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const dataFilePath = path.join(process.cwd(), 'Data.json');
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  const data = JSON.parse(jsonData);
  const books = getAuthors(data);
  
  const paths = books.map((book) => ({
    params: { id: book.id },
  }));
  console.log(paths);
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const dataFilePath = path.join(process.cwd(), 'Data.json');
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  const data = JSON.parse(jsonData);
  console.log("**********=", params)
  const books = getBooks(data);

  const authors = getAuthors(data);
  const author = authors.find((a) => a.id === params.id);
  if (!author) {
    return { notFound: true };
  }
  const book = books.find((b) => b.authorId === params.id);
  if (!book) {
    return { notFound: true };
  }

  return { props: { author, book }, revalidate: 300, };
}
