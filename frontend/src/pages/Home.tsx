import { SEO } from "@/components/SEO";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";

export default function HomePage() {
  return (
    <>
      <SEO
        title="Hakizimana Leogad — Embedded Systems & IoT Engineer"
        description="Hakizimana Leogad is an Embedded Systems and IoT Engineer from Kigali, Rwanda. Specializing in Arduino, ESP32, embedded systems development, and intelligent automation."
        path="/"
      />
      <Hero />
      <Stats />
    </>
  );
}
