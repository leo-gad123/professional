import mongoose from "mongoose";

export let dbConnected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://portfolio";
  try {
    await mongoose.connect(uri);
    dbConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error(
      "MongoDB unavailable — API endpoints requiring DB will return errors:",
      (err as Error).message,
    );
  }
}
