import dbConnect from '@/lib/mongoose';
import Book from '@/models/Book';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const books = await Book.find();
    res.status(200).json(books);
  } else {
    res.status(405).end();
  }
}