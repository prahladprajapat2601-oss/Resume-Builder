import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Trying to connect to MongoDB...");

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not set");
    }

    console.log(
      "Mongo URI loaded:",
      process.env.MONGODB_URI.replace(/:([^@]+)@/, ":****@")
    );

    await mongoose.connect(process.env.MONGODB_URI, {
      family: 4,
      serverSelectionTimeoutMS: 10000,
    });

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;