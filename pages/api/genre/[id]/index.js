import dbConnect from '@/lib/mongoose';
import Book from '@/models/Book';

export default async function handler(req, res) {
  dbConnect();
  const { id } = req.query;
  if (req.method === "GET") {
    const books = await Book.find({ genreId: id }); // Filter books by genreId
    res.status(200).json(books);
  } else {
    res.status(405).end();
  }
}
