import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { ChevronRight } from "lucide-react";

const groups = [
  { title: "Programming", items: ["C", "C++", "Python", "HTML", "CSS", "JavaScript"] },
  { title: "Embedded Systems", items: ["Arduino", "ESP32", "Raspberry Pi", "STM32"] },
  { title: "Electronics", items: ["Sensors", "Actuators", "PCB Design", "Circuit Analysis"] },
  { title: "Tools", items: ["Git", "GitHub", "Proteus", "KiCad", "VS Code"] },
];

export function Skills() {
  return (
    <section id="skills" className="section-alt relative px-4 sm:px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Skills" title="Tools &" accent="Tech" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 stagger-children">
          {groups.map((g) => (
            <div key={g.title} className="bg-card rounded-2xl p-6 card-shadow">
              <div className="mb-5">
                <h3 className="font-serif text-xl font-medium text-foreground">{g.title}</h3>
                <div className="mt-2 h-0.5 w-8 rounded-full bg-gradient-to-r from-primary to-emerald-300" />
              </div>
              <ul className="space-y-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                  >
                    <ChevronRight className="h-3 w-3 text-primary shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
