import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { useProjectsList } from "@/hooks/useSiteSettings";
import { ExternalLink, Github } from "lucide-react";

const fallback = [
  { _id: "f1", title: "AI Smart Agriculture System", description: "Crop disease detection + automatic irrigation.", tags: ["AI", "IoT", "Sensors"], image_url: null, project_url: null, repo_url: null },
  { _id: "f2", title: "Autonomous Delivery Robot", description: "GPS navigation, obstacle avoidance & AI vision.", tags: ["Robotics", "Vision", "GPS"], image_url: null, project_url: null, repo_url: null },
  { _id: "f3", title: "Smart Traffic Control System", description: "AI vehicle detection and adaptive traffic lights.", tags: ["AI", "Embedded"], image_url: null, project_url: null, repo_url: null },
];

export function Projects() {
  const { data, isLoading } = useProjectsList();
  const items = !isLoading && data && data.length > 0 ? data : fallback;

  return (
    <section id="projects" className="section-alt relative px-4 sm:px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Projects" title="Selected" accent="Work" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-children">
          {items.map((p, i) => {
            const Wrapper = p.project_url ? "a" : "article";
            const wrapperProps = p.project_url
              ? { href: p.project_url, target: "_blank", rel: "noreferrer" }
              : {};
            return (
              <Wrapper
                key={p._id}
                {...(wrapperProps as Record<string, string>)}
                className="group relative overflow-hidden rounded-2xl bg-card p-6 card-shadow"
              >
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-primary/5 to-primary/10 blur-3xl transition-all duration-500 group-hover:scale-150" />
                <p className="relative font-mono text-[10px] text-primary font-medium mb-3">
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </p>
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="relative w-full h-40 object-cover rounded-xl mb-4"
                    loading="lazy"
                  />
                )}
                <h3 className="relative font-serif text-xl leading-tight mb-2.5 text-foreground group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed mb-5">{p.description}</p>
                <div className="relative flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t: string) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] uppercase tracking-wider rounded-full bg-primary/5 text-primary px-3 py-1 font-medium"
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
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
