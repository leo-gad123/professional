import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

export async function connectDB() {
  if (cachedConnection) {
    return cachedConnection;
  }
  const uri = process.env.MONGODB_URI || "mongodb://portfolio";
  try {
    await mongoose.connect(uri);
    cachedConnection = mongoose;
    console.log("MongoDB connected");
  } catch (err) {
    console.error(
      "MongoDB unavailable — API endpoints requiring DB will return errors:",
      (err as Error).message,
    );
  }
}
