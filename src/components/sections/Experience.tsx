import { SectionHeading } from "../SectionHeading";

const roles = [
  {
    title: "Embedded Systems Developer",
    items: ["Hardware Design", "Sensor Integration", "Real-Time Control Systems"],
  },
  {
    title: "IoT Developer",
    items: ["Wireless Communication", "Cloud Integration", "Remote Monitoring Systems"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Experience" title="My" accent="Journey" />
        <div className="relative pl-8 md:pl-12">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" />
          {roles.map((r, i) => (
            <div key={r.title} className="relative mb-12 last:mb-0">
              <div className="absolute -left-[34px] md:-left-[50px] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20 animate-pulse-glow" />
              <div className="glass rounded-2xl p-8 glass-hover">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                  Role 0{i + 1}
                </p>
                <h3 className="mt-2 font-serif text-3xl">{r.title}</h3>
                <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                  {r.items.map((it) => (
                    <li key={it} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">◆</span> {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
