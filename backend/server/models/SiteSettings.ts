import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    availability: {
      type: String,
      enum: ["available", "busy", "unavailable"],
      default: "available",
    },
    status_message: { type: String, default: "Available for new projects" },
    contact_email: { type: String, default: null },
    contact_phone: { type: String, default: null },
    location: { type: String, default: null },
    github_url: { type: String, default: null },
    linkedin_url: { type: String, default: null },
    twitter_url: { type: String, default: null },
    website_url: { type: String, default: null },
  },
  { timestamps: true },
);

export const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);
