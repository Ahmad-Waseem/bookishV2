import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  searchHistory: [String],
});

export default mongoose.models.User || mongoose.model('User', userSchema);
