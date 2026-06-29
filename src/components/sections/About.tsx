import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import portraitAsset from "@/assets/portrait.png";
import { CheckCircle2 } from "lucide-react";

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
    <section id="about" className="relative px-4 sm:px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="About" title="Who I" accent="Am" />
        <div className="grid gap-12 items-center md:grid-cols-5">
          <Reveal delay={0.1} className="md:col-span-2">
            <div className="relative rounded-2xl overflow-hidden card-shadow">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-primary/5 blur-2xl -z-10" />
              <img
                src={portraitAsset}
                alt="Portrait of Hakizimana Leogad"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={0.2} className="space-y-5 md:col-span-3">
            <p className="text-base sm:text-[17px] leading-relaxed text-muted-foreground">
              I'm <span className="text-foreground font-medium">Hakizimana Leogad</span>, an
              Embedded Systems and IoT Engineer building smart technology with Arduino, ESP32,
              Raspberry Pi, and electronics. Passionate about creating intelligent, connected
              systems powered by innovation and machine learning.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 stagger-children">
              {focus.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-3 rounded-xl bg-secondary/60 px-4 py-3"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-foreground">{f}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
