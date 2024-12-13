import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  biography: String,
});

export default mongoose.models.Author || mongoose.model('Author', authorSchema);
