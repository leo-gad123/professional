import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { Briefcase } from "lucide-react";

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
    <section id="experience" className="relative px-4 sm:px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Experience" title="My" accent="Journey" />
        <div className="relative pl-10 md:pl-14">
          <div className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-primary/30 to-emerald-100" />
          {roles.map((r, i) => (
            <div
              key={r.title}
              className="relative mb-10 last:mb-0 animate-fade-in-up"
              style={{ animationDelay: `${0.1 + i * 0.2}s` }}
            >
              <div className="absolute -left-[30px] md:-left-[38px] top-2 flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-background border-2 border-primary shadow-sm">
                <Briefcase className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary" />
              </div>
              <div className="bg-card rounded-2xl p-7 card-shadow">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary font-medium">
                  Role 0{i + 1}
                </p>
                <h3 className="mt-2 font-serif text-2xl md:text-3xl font-medium text-foreground">
                  {r.title}
                </h3>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-3 stagger-children">
                  {r.items.map((it) => (
                    <li
                      key={it}
                      className="text-sm text-muted-foreground flex items-start gap-2.5 bg-secondary/50 rounded-xl px-4 py-3"
                    >
                      <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {it}
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
