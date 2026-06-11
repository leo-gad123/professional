import { SectionHeading } from "../SectionHeading";
import { useProjectsList } from "@/hooks/useSiteSettings";

const fallback = [
  { id: "f1", title: "AI Smart Agriculture System", description: "Crop disease detection + automatic irrigation.", tags: ["AI", "IoT", "Sensors"], image_url: null, project_url: null, repo_url: null },
  { id: "f2", title: "Autonomous Delivery Robot", description: "GPS navigation, obstacle avoidance & AI vision.", tags: ["Robotics", "Vision", "GPS"], image_url: null, project_url: null, repo_url: null },
  { id: "f3", title: "Smart Traffic Control System", description: "AI vehicle detection and adaptive traffic lights.", tags: ["AI", "Embedded"], image_url: null, project_url: null, repo_url: null },
];

export function Projects() {
  const { data, isLoading } = useProjectsList();
  const items = !isLoading && data && data.length > 0 ? data : fallback;

  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Projects" title="Selected" accent="Work" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => {
            const Wrapper = p.project_url ? "a" : "article";
            const wrapperProps = p.project_url
              ? { href: p.project_url, target: "_blank", rel: "noreferrer" }
              : {};
            return (
              <Wrapper
                key={p.id}
                {...(wrapperProps as Record<string, string>)}
                className="glass glass-hover group relative overflow-hidden rounded-2xl p-6 block"
              >
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
                <p className="font-mono text-[10px] text-primary mb-3">
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </p>
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                    loading="lazy"
                  />
                )}
                <h3 className="font-serif text-2xl leading-tight mb-3 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-wider rounded-full border border-primary/30 px-3 py-1 text-primary/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
