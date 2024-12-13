import dbConnect from '@/lib/mongoose';
import Book from '@/models/Book';

export default async function handler(req, res) {
  dbConnect();
  const { id } = req.query;
  if (req.method === "GET") {
    const book = await Book.findById(id);
    res.status(200).json(book);
  } else {
    res.status(405).end();
  }
}
