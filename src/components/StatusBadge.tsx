import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Circle } from "lucide-react";

const styles = {
  available: {
    dot: "text-emerald-500",
    container: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/40",
  },
  busy: {
    dot: "text-amber-500",
    container: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800/40",
  },
  unavailable: {
    dot: "text-rose-500",
    container: "bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800/40",
  },
} as const;

export function StatusBadge() {
  const { data } = useSiteSettings();
  const availability = data?.availability ?? "available";
  const message = data?.status_message ?? "Available for new projects";
  const s = styles[availability];

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 border ${s.container}`}
    >
      <Circle className={`h-2.5 w-2.5 fill-current animate-pulse-dot ${s.dot}`} />
      <span className={`font-mono text-[11px] uppercase tracking-[0.15em] font-medium ${s.dot}`}>
        {message}
      </span>
    </div>
  );
}
