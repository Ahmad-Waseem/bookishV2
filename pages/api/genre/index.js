import dbConnect from '@/lib/mongoose';
import Genre from '@/models/Genre';

export default async function handler(req, res) {
  dbConnect();
  if (req.method === "GET") {
    const genres = await Genre.find(); // Fetch all genres
    res.status(200).json(genres);
  } else {
    res.status(405).end();
  }
}
