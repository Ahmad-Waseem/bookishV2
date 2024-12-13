import dbConnect from '@/lib/mongoose';
export async function handler(req, res) {
  dbConnect();
  const { id } = req.query;
  if (req.method === "GET") {
    const author = await Author.findById(id);
    const books = await Book.find({ authorId: id }); // Fetch books by author
    res.status(200).json({ author, books });
  } else {
    res.status(405).end();
  }
}
