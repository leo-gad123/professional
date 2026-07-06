import { motion } from "framer-motion";
import { SectionHeading } from "../SectionHeading";
import { TiltCard } from "@/components/TiltCard";
import { useProjectsList } from "@/hooks/useSiteSettings";
import { ExternalLink, Github, FolderOpen } from "lucide-react";

const fallback = [
  {
    _id: "f1",
    title: "AI Smart Agriculture System",
    description: "Crop disease detection + automatic irrigation using ML and sensor fusion.",
    tags: ["AI", "IoT", "Sensors"],
    image_url: null,
    project_url: null,
    repo_url: null,
  },
  {
    _id: "f2",
    title: "Autonomous Delivery Robot",
    description: "GPS navigation, obstacle avoidance & AI vision for last-mile delivery.",
    tags: ["Robotics", "Vision", "GPS"],
    image_url: null,
    project_url: null,
    repo_url: null,
  },
  {
    _id: "f3",
    title: "Smart Traffic Control System",
    description: "AI-powered vehicle detection and adaptive traffic light optimization.",
    tags: ["AI", "Embedded"],
    image_url: null,
    project_url: null,
    repo_url: null,
  },
];

export function Projects() {
  const { data, isLoading } = useProjectsList();
  const items = !isLoading && data && data.length > 0 ? data : fallback;

  return (
    <section id="projects" className="relative px-4 sm:px-6 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 h-72 w-72 rounded-full bg-emerald-500/3 blur-[100px] pointer-events-none" />
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Projects" title="Selected" accent="Work" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => {
            const Wrapper = p.project_url ? "a" : "article";
            const wrapperProps = p.project_url
              ? { href: p.project_url, target: "_blank", rel: "noreferrer" }
              : {};
            return (
              <TiltCard key={p._id}>
                <Wrapper
                  {...(wrapperProps as Record<string, string>)}
                  className="group relative block h-full overflow-hidden rounded-2xl border border-emerald-500/10 bg-gradient-to-br from-[#0a0a12] to-[#111118] p-6"
                >
                  <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-emerald-500/3 blur-3xl transition-all duration-500 group-hover:scale-150 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/10">
                        <FolderOpen className="h-5 w-5 text-emerald-400" />
                      </div>
                      <span className="font-mono text-[10px] text-emerald-400/60 font-medium">
                        {String(i + 1).padStart(2, "0")}
                        <span className="text-muted-foreground">
                          /{String(items.length).padStart(2, "0")}
                        </span>
                      </span>
                    </div>

                    {p.image_url && (
                      <div className="relative mb-4 overflow-hidden rounded-xl border border-emerald-500/5">
                        <img
                          src={p.image_url}
                          alt={p.title}
                          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/40 to-transparent pointer-events-none" />
                      </div>
                    )}

                    <h3 className="font-serif text-lg leading-tight mb-2 text-foreground group-hover:text-emerald-400 transition-colors duration-300">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags.map((t: string) => (
                          <span
                            key={t}
                            className="font-mono text-[9px] uppercase tracking-wider rounded-full border border-emerald-500/10 bg-emerald-500/5 text-emerald-400 px-2.5 py-1 font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      {p.repo_url && (
                        <a
                          href={p.repo_url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/10 text-muted-foreground hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </Wrapper>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
