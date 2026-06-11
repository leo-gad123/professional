import { SectionHeading } from "../SectionHeading";
import portraitAsset from "@/assets/portrait.png.asset.json";

const focus = [
  "Embedded Systems Development",
  "Arduino Programming",
  "ESP32 Development",
  "IoT Solutions",
  "Electronics Prototyping",
  "Machine Learning Interest",
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="About" title="Who I" accent="Am" />
        <div className="grid gap-12 items-center md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="relative rounded-2xl overflow-hidden glass">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-transparent blur-2xl -z-10" />
              <img
                src={portraitAsset.url}
                alt="Portrait of Hakizimana Leogad"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="space-y-6 md:col-span-3">
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm <span className="text-foreground font-medium">Hakizimana Leogad</span>, an
              Embedded Systems Developer and IoT Engineer based in Kigali, Rwanda. I build
              intelligent hardware that bridges the physical and digital worlds — from sensor
              networks to autonomous robotics.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              My work spans Arduino, ESP32, and Raspberry Pi platforms, combined with a growing
              interest in machine learning to create devices that perceive, decide, and act.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {focus.map((f) => (
                <div key={f} className="glass rounded-lg px-4 py-3 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
