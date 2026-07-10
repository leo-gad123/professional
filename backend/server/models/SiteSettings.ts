import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    display_name: { type: String, default: "Hakizimana Leogad" },
    cv_url: { type: String, default: null },
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

    // SEO fields
    seo_title: { type: String, default: null },
    seo_description: { type: String, default: null },
    seo_keywords: { type: String, default: null },
    seo_og_image: { type: String, default: null },
    seo_twitter_handle: { type: String, default: null },
  },
  { timestamps: true },
);

export const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);
