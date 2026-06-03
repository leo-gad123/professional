import { SectionHeading } from "../SectionHeading";

const projects = [
  { name: "AI Smart Agriculture System", desc: "Crop disease detection + automatic irrigation.", tags: ["AI", "IoT", "Sensors"] },
  { name: "Autonomous Delivery Robot", desc: "GPS navigation, obstacle avoidance & AI vision.", tags: ["Robotics", "Vision", "GPS"] },
  { name: "Smart Traffic Control System", desc: "AI vehicle detection and adaptive traffic lights.", tags: ["AI", "Embedded"] },
  { name: "Industrial Predictive Maintenance", desc: "Predict machine failures using sensor data.", tags: ["ML", "Industrial"] },
  { name: "Face Recognition Attendance", desc: "Attendance and door access control.", tags: ["Vision", "Security"] },
  { name: "Smart Home Automation", desc: "IoT control of lights, fans, and appliances.", tags: ["IoT", "ESP32"] },
  { name: "GPS Vehicle Tracking", desc: "Real-time location monitoring of vehicles.", tags: ["GPS", "Cloud"] },
  { name: "AI Security Surveillance", desc: "Person detection and intrusion alerts.", tags: ["AI", "Vision"] },
  { name: "Sign Language Translator", desc: "Hand gesture recognition to text & speech.", tags: ["AI", "Accessibility"] },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Projects" title="Selected" accent="Work" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <article
              key={p.name}
              className="glass glass-hover group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
              <p className="font-mono text-[10px] text-primary mb-3">
                {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </p>
              <h3 className="font-serif text-2xl leading-tight mb-3 group-hover:text-primary transition-colors">
                {p.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.desc}</p>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
