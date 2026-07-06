import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";

import type { SiteSettings } from "@/types";

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
