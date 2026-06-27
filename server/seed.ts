import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./models/User.js";
import { SiteSettings } from "./models/SiteSettings.js";

const ADMIN_EMAIL = "hakizimanaleogad@gmail.com";
const ADMIN_PASSWORD = "leogad@123";

async function seed() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", (err as Error).message);
    process.exit(1);
  }

  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    existing.password = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await existing.save();
    console.log(`Admin password updated for ${ADMIN_EMAIL}`);
  } else {
    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await User.create({ email: ADMIN_EMAIL, password: hashed });
    console.log(`Admin user created: ${ADMIN_EMAIL}`);
  }

  const settings = await SiteSettings.findOne();
  if (!settings) {
    await SiteSettings.create({
      contact_email: ADMIN_EMAIL,
      contact_phone: "+250 793 953 775",
      location: "Kigali, Rwanda",
      github_url: "https://github.com/leo-gad123",
      linkedin_url: "https://www.linkedin.com/in/leogadhakizimana/",
    });
    console.log("Default site settings created");
  }

  await mongoose.disconnect();
  console.log("Seed complete");
}

seed();
