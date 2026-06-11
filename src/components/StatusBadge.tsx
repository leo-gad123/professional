import { useSiteSettings } from "@/hooks/useSiteSettings";

const styles = {
  available: { dot: "bg-emerald-400", text: "text-emerald-300", ring: "ring-emerald-400/30" },
  busy: { dot: "bg-amber-400", text: "text-amber-300", ring: "ring-amber-400/30" },
  unavailable: { dot: "bg-rose-400", text: "text-rose-300", ring: "ring-rose-400/30" },
} as const;

export function StatusBadge() {
  const { data } = useSiteSettings();
  const availability = data?.availability ?? "available";
  const message = data?.status_message ?? "Available for new projects";
  const s = styles[availability];

  return (
    <div className={`inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 ring-1 ${s.ring}`}>
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${s.dot}`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${s.dot}`} />
      </span>
      <span className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] ${s.text}`}>
        {message}
      </span>
    </div>
  );
}
