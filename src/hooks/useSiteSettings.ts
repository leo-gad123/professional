import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";

export type SiteSettings = {
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
};

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: (): Promise<SiteSettings | null> => api.getSiteSettings(),
    staleTime: 60_000,
  });
}

export function useProjectsList() {
  return useQuery({
    queryKey: ["projects", "published"],
    queryFn: () => api.getPublishedProjects(),
    staleTime: 60_000,
  });
}
