import { SectionHeading } from "../SectionHeading";

const groups = [
  { title: "Programming", items: ["C", "C++", "Python", "HTML", "CSS", "JavaScript"] },
  { title: "Embedded Systems", items: ["Arduino", "ESP32", "Raspberry Pi", "STM32"] },
  { title: "Electronics", items: ["Sensors", "Actuators", "PCB Design", "Circuit Analysis"] },
  { title: "Tools", items: ["Git", "GitHub", "Proteus", "KiCad", "VS Code"] },
];

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Skills" title="Tools &" accent="Tech" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div key={g.title} className="glass glass-hover rounded-2xl p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-primary animate-pulse-glow" />
                <h3 className="font-serif text-2xl">{g.title}</h3>
              </div>
              <ul className="space-y-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                  >
                    <span className="font-mono text-[10px] text-primary">{">"}</span>
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
