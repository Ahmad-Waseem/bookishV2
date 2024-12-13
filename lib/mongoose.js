import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("-------------------------DB Already Connected!--------------------------------");
    return; // Already connected
  }
  
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  console.log("-------------------------New Connection!!!!!!!!!!!--------------------------------");
};

export default dbConnect;
