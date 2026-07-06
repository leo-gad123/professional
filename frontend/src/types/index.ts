export interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  image_url: string | null;
  project_url: string | null;
  repo_url: string | null;
  sort_order: number;
  is_published: boolean;
}

export interface Slide {
  _id: string;
  image_url: string;
  alt: string;
  sort_order: number;
  is_active: boolean;
}

export interface SiteSettings {
  _id: string;
  availability: "available" | "busy" | "unavailable";
  status_message: string;
  contact_email: string | null;
  contact_phone: string | null;
  location: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  website_url: string | null;

  // SEO
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  seo_og_image: string | null;
  seo_twitter_handle: string | null;
}

export interface ContactForm {
  contact_email: string;
  contact_phone: string;
  location: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
  website_url: string;
}

export interface SEOForm {
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_og_image: string;
  seo_twitter_handle: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}
