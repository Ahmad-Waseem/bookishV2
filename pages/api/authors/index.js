import dbConnect from "@/lib/mongoose";
import Author from "@/models/Author";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const authors = await Author.find(); // Fetch all authors
    res.status(200).json(authors);
  } else {
    res.status(405).end();
  }
}
