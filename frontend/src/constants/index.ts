export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export const SITE_CONFIG = {
  name: "Hakizimana Leogad",
  title: "Embedded Systems & IoT Engineer",
  location: "Kigali, Rwanda",
  email: "hakizimanaleogad@gmail.com",
  url: "https://leogad.pages.dev",
} as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/leo-gad123",
  linkedin: "https://www.linkedin.com/in/leogadhakizimana/",
} as const;

export const AVATARS = {
  tech: ["Python", "C++", "JS", "IoT"],
} as const;

export const STATUS_OPTIONS = [
  { value: "available", label: "Available for new projects" },
  { value: "busy", label: "Busy / Limited availability" },
  { value: "unavailable", label: "Unavailable" },
] as const;
