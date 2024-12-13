import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorId: { type: String, required: true },
  description: String,
  price: Number,
  genreId: { type: String, required: true },
  rating: Number,
});


export default mongoose.models.Book || mongoose.model('Book', BookSchema);
