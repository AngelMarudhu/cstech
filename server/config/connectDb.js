import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
    });
    console.log("Cs connected to DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
