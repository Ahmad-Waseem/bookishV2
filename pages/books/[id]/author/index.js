import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AuthorDetails({ author }) {
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


export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log("000000000000000000000000> ", id)
  try {
    // Fetch book details
    const bookRes = await fetch(`http://localhost:3000/api/books/${id}`);
    const book = await bookRes.json();
    console.log("................ ", book, " ...................")

    if (!book) {
      return { notFound: true };
    }

    // Fetch all authors
    const authorsRes = await fetch('http://localhost:3000/api/authors');
    const authors = await authorsRes.json();

    const author = authors.find((a) => a.id === book.authorId);
    console
    if (!author) {
      return { notFound: true };
    }

    return {
      props: { author },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { notFound: true };
  }
}