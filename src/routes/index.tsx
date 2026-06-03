import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hakizimana Leogad — Embedded Systems & IoT Engineer" },
      { name: "description", content: "Portfolio of Hakizimana Leogad — Embedded Systems Developer, IoT Engineer, Arduino programmer and electronics enthusiast based in Kigali, Rwanda." },
      { property: "og:title", content: "Hakizimana Leogad — Embedded Systems & IoT Engineer" },
      { property: "og:description", content: "Building intelligent hardware, IoT systems, and automation that solve real-world challenges." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ParticleBackground />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
