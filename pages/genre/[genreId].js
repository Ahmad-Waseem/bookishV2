import { getBooks, getGenres } from '@/lib/data';
import path from 'path';
import fs from 'fs';
import BookList from '@/components/bookList';

export async function getServerSideProps({ params }) {
    const dataFilePath = path.join(process.cwd(), 'Data.json');
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    const data = JSON.parse(jsonData);

    //console.log(params)
    //console.log(params.id)
    const genre = getGenres(data).find((g) => g.id === params.genreId);
    //console.log(genre)
    //console.log(genre);


    // if (!genre) {
    //     return {
    //         notFound: true,
    //     };
    // }
    const books = getBooks(data).filter((book) => book.genreId === params.genreId);

    return { props: { genre, books } };
}

export default function GenreBooksPage({ genre, books }) {
    if(!genre){
        return(<h1>NOT FOUND</h1>);
    }
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">Books in {genre.name}</h1>
            <BookList filteredBooks={books} />
        </div>
    );
}
